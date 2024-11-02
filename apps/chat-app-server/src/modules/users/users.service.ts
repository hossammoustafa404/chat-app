import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async createOne(userData: Partial<User>) {
    const { email, username, password } = userData;
    const validationErrMessages = [];

    // Check that the email is unique
    const { user: existingUserWithEmail } = await this.findOneBy({ email });
    if (existingUserWithEmail) {
      validationErrMessages.push({
        message: ['Email is taken'],
        path: 'email',
      });
    }

    // Check that the username is unique
    const { user: existingUserWithUsername } = await this.findOneBy({
      username,
    });
    if (existingUserWithUsername) {
      validationErrMessages.push({
        message: ['Username is taken'],
        path: 'username',
      });
    }

    if (validationErrMessages.length) {
      throw new BadRequestException(validationErrMessages);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    userData = { ...userData, password: hashedPassword };

    // Create the user
    const createdUser = new User();
    Object.assign(createdUser, userData);

    // Insert the user into db
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .values(createdUser)
      .execute();

    // Return the created user
    return { user: createdUser };
  }

  async findMany() {
    // Find many users
    const foundUsers = await this.userRepository.createQueryBuilder().getMany();

    // Return the found users
    return { users: foundUsers };
  }

  async findOneBy(filter: Partial<User>) {
    // Find the user
    const foundUser = await this.userRepository
      .createQueryBuilder()
      .where(filter)
      .getOne();

    // Return the found user
    return { user: foundUser };
  }

  async findOneById(userId: string) {
    // Find the user
    const foundUser = await this.userRepository
      .createQueryBuilder()
      .where({ id: userId })
      .getOne();

    // Throw a not found exception if the user does not exist
    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    // Return the found user
    return { user: foundUser };
  }

  async updateOneById(userId: string, updateUserDto: UpdateUserDto) {
    // Update the user
    const {
      affected,
      raw: [updatedUser],
    } = await this.userRepository
      .createQueryBuilder()
      .update()
      .where({ id: userId })
      .set(updateUserDto)
      .returning('*')
      .execute();

    // Throw a not found exception if the user does not exist
    if (!affected) {
      throw new NotFoundException('User does not exist');
    }

    // Return the updated user
    return { user: updatedUser };
  }

  async deleteOneById(userId: string) {
    // Delete the user
    const { affected } = await this.userRepository
      .createQueryBuilder()
      .delete()
      .where({ id: userId })
      .execute();

    // Throw a not found exception if the user does not exist
    if (!affected) {
      throw new NotFoundException('User does not exist');
    }
  }
}
