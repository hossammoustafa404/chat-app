import { User } from '@/modules/users/entities';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ConnectionRequestStatus } from '../types';
import { CustomBaseEntity } from '@/shared/entities';

@Entity()
export class ConnectionRequest extends CustomBaseEntity {
  @Column({
    type: 'enum',
    enum: ConnectionRequestStatus,
    default: ConnectionRequestStatus.PENDING,
  })
  status: ConnectionRequestStatus;

  @ManyToOne((type) => User, (user) => user.sentConnectionRequests)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column()
  senderId: string;

  @ManyToOne((type) => User, (user) => user.receivedConnectionRequests)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @Column()
  receiverId: string;
}
