import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConnectionRequestDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionRequest } from './entities';
import { Repository } from 'typeorm';
import { ConnectionRequestStatus } from './types';
import { UsersService } from '../users/users.service';

@Injectable()
export class ConnectionRequestsService {
  constructor(
    @InjectRepository(ConnectionRequest)
    private readonly connectionRequestRepository: Repository<ConnectionRequest>,
    private readonly usersService: UsersService
  ) {}
  async createOne(
    createConnectionRequestDto: CreateConnectionRequestDto,
    senderId: string
  ) {
    const { receiverId } = createConnectionRequestDto;

    // Check that the sender is not the receiver
    if (senderId === receiverId) {
      throw new ForbiddenException(
        'Sender cannot send a connection request to himself'
      );
    }

    // Check that the receiver exists
    await this.usersService.findOneById(receiverId);

    // Check that the receiver is not in the sender connections
    // [TO DO]

    // Check that there is not a pending connection request between the sender and the receiver
    const { data: existingConnRequest } =
      (await this.findOne([
        { senderId, receiverId, status: ConnectionRequestStatus.PENDING },
        {
          senderId: receiverId,
          receiverId: senderId,
          status: ConnectionRequestStatus.PENDING,
        },
      ])) || {};

    if (existingConnRequest) {
      const msg =
        existingConnRequest.senderId === senderId
          ? 'Sender already sent a connection request to receiver'
          : 'Receiver already sent a connection request to sender';
      throw new ForbiddenException(msg);
    }

    // Create the connection request
    const {
      raw: [connectionRequest],
    } = await this.connectionRequestRepository
      .createQueryBuilder()
      .insert()
      .values({ senderId, ...createConnectionRequestDto })
      .returning('*')
      .execute();

    // Return the created connection request
    return { data: connectionRequest };
  }

  async findMany(currUserId: string) {
    // Find the connection requests
    const connectionRequests = await this.connectionRequestRepository
      .createQueryBuilder()
      .where([{ senderId: currUserId }, { receiverId: currUserId }])
      .andWhere({ status: ConnectionRequestStatus.PENDING })
      .getMany();

    // Return the connection requests
    return { data: connectionRequests };
  }

  async findOneById(connectionRequestId: string) {
    // Find the connection request
    const connectionRequest = await this.connectionRequestRepository
      .createQueryBuilder()
      .where({ id: connectionRequestId })
      .getOne();

    // Throw a not found exception if the connection request does not exist
    if (!connectionRequest) {
      throw new NotFoundException('Connection request does not exist');
    }

    // Return the connection request
    return { data: connectionRequest };
  }
  async findOne(filter: any) {
    const connectionRequest = await this.connectionRequestRepository
      .createQueryBuilder()
      .where(filter)
      .getOne();
    return connectionRequest ? { data: connectionRequest } : null;
  }

  async acceptOne(connectionRequestId: string) {
    // Check that the connection request exists
    const { data: existingConnRequest } = await this.findOneById(
      connectionRequestId
    );

    // Check that the connection request is not accepted
    if (existingConnRequest.status === ConnectionRequestStatus.ACCEPTED) {
      throw new ForbiddenException('Connection request is already accepted');
    }

    // Check that the connection request is not rejected
    if (existingConnRequest.status === ConnectionRequestStatus.REJECTED) {
      throw new ForbiddenException(
        'Cannot accept a rejected connection request'
      );
    }

    // Update the connection request status to accepted
    const {
      raw: [connectionRequest],
    } = await this.connectionRequestRepository
      .createQueryBuilder()
      .update()
      .set({ status: ConnectionRequestStatus.ACCEPTED })
      .where({ id: connectionRequestId })
      .returning('*')
      .execute();

    // Return the connection request
    return { data: connectionRequest };
  }

  async rejectOne(connectionRequestId: string) {
    // Check that the connection request exists
    const { data: existingConnRequest } = await this.findOneById(
      connectionRequestId
    );

    // Check that the connection request is not accepted
    if (existingConnRequest.status === ConnectionRequestStatus.REJECTED) {
      throw new ForbiddenException('Connection request is already rejected');
    }

    // Check that the connection request is not rejected
    if (existingConnRequest.status === ConnectionRequestStatus.ACCEPTED) {
      throw new ForbiddenException(
        'Cannot reject a accepted connection request'
      );
    }
    // Update the connection request status to rejected
    const {
      raw: [connectionRequest],
    } = await this.connectionRequestRepository
      .createQueryBuilder()
      .update()
      .set({ status: ConnectionRequestStatus.REJECTED })
      .where({ id: connectionRequestId })
      .returning('*')
      .execute();

    // Return the connection request
    return { data: connectionRequest };
  }

  async deleteOneById(connectionRequestId: string) {
    // Delete the connection request
    const { affected } = await this.connectionRequestRepository
      .createQueryBuilder()
      .delete()
      .where({ id: connectionRequestId })
      .execute();

    // Throw a not found exception if the connection request does not exist
    if (!affected) {
      throw new NotFoundException('Connection request does not exist');
    }
  }
}
