import { Exclude } from 'class-transformer';
import { User } from '../entities';

export class UserDto extends User {
  @Exclude()
  password: string;
}
