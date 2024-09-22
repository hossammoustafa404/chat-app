import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dtos';
import type { EntityId } from '@/shared/entities';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    // Create the user
    const { user: createdUser } = await this.usersService.createOne(
      registerDto
    );

    // Generate the auth tokens
    const { accessToken, refreshToken } = await this.genAuthTokens({
      sub: createdUser.id,
    });

    // Return the user and auth tokens
    return { user: createdUser, accessToken, refreshToken };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find the user by email
    const { user: foundUser } = await this.usersService.findOneBy({ email });

    // Throw unauthorized exception if the passwords do not match
    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the password
    const isPasswordsMatch = await bcrypt.compare(password, foundUser.password);

    // Throw unauthorized exception if the passwords do not match
    if (!isPasswordsMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate the auth tokens
    const { accessToken, refreshToken } = await this.genAuthTokens({
      sub: foundUser.id,
    });

    // Return the user and auth tokens
    return { user: foundUser, accessToken, refreshToken };
  }

  private async genAuthTokens(payload: { sub: EntityId }) {
    // Generate access token
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });

    // Generate refresh token
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    // Return the auth tokens
    return { accessToken, refreshToken };
  }
}
