import type { UUID } from 'crypto';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type EntityId = UUID;

export abstract class CustomBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: EntityId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
