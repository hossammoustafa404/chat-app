import { User } from '@/modules/users/entities';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsEmailUnique', async: true })
class IsEmailUnique implements ValidatorConstraintInterface {
  async validate(value: string) {
    const existingUser = await User.exists({ where: { email: value } });
    return !existingUser;
  }
  defaultMessage() {
    return 'Email already exists';
  }
}

@ValidatorConstraint({ name: 'IsUsernameUnique', async: true })
class IsUsernameUnique implements ValidatorConstraintInterface {
  async validate(value: string) {
    const existingUser = await User.exists({ where: { username: value } });
    return !existingUser;
  }
  defaultMessage() {
    return 'Username already exists';
  }
}
export class RegisterDto {
  /**
   * @example 'Hossam'
   */
  @IsString()
  @IsNotEmpty()
  firstName: string;

  /**
   * @example 'Moustafa'
   */
  @IsString()
  @IsNotEmpty()
  lastName: string;

  /**
   * @example 'test@example.com'
   */
  @IsEmail()
  @Validate(IsEmailUnique)
  @IsNotEmpty()
  email: string;

  /**
   * @example 'hossam2020'
   */
  @IsString()
  @Validate(IsUsernameUnique)
  @IsNotEmpty()
  username: string;

  /**
   * @example 'password'
   */
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
