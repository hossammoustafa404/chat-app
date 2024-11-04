import { CustomBaseEntity } from '@/shared/entities';
import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ConnectionRequest } from '@/modules/connection-requests/entities';

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

  @Exclude()
  @Column()
  password: string;

  @OneToMany(
    (type) => ConnectionRequest,
    (connectionRequest) => connectionRequest.sender
  )
  sentConnectionRequests: ConnectionRequest[];

  @OneToMany(
    (type) => ConnectionRequest,
    (connectionRequest) => connectionRequest.receiver
  )
  receivedConnectionRequests: ConnectionRequest[];
}
