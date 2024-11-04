import { Module } from '@nestjs/common';
import { ConnectionRequestsService } from './connection-requests.service';
import { ConnectionRequestsController } from './connection-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionRequest } from './entities';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectionRequest]), UsersModule],
  controllers: [ConnectionRequestsController],
  providers: [ConnectionRequestsService],
})
export class ConnectionRequestsModule {}
