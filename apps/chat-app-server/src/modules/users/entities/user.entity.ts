import { CustomBaseEntity } from '@/shared/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CustomBaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;
}
