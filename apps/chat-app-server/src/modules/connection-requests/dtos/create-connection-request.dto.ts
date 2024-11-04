import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateConnectionRequestDto {
  @IsNotEmpty()
  @IsUUID()
  receiverId: string;
}
