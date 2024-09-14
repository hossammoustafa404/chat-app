import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'password'])
) {
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
