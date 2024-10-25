import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';

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
  @IsNotEmpty()
  email: string;

  /**
   * @example 'hossam2020'
   */
  @IsString()
  @IsNotEmpty()
  username: string;

  /**
   * @example 'password'
   */
  @IsString()
  // @Min(8)
  @IsNotEmpty()
  password: string;
}
