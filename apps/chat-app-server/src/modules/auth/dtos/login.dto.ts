import { PickType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto extends PickType(RegisterDto, ['email']) {
  /**
   * @example 'password'
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
