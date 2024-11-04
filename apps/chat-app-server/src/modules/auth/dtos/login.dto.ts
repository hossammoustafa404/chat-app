import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  /**
   * @example 'test@example.com'
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * @example 'password'
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
