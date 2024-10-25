import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto{
  /**
   * @example 'Hossam'
   */
  @IsString()
  @IsOptional()
  firstName?: string;

  /**
   * @example 'Moustafa'
   */
  @IsString()
  @IsOptional()
  lastName?: string;

  /**
   * @example 'hossam.moustafa'
   */
  @IsString()
  @IsOptional()
  username?: string;
}
