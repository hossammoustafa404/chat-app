import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ConnectionRequestsService } from './connection-requests.service';
import { CreateConnectionRequestDto } from './dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser, User } from '@/shared/decorators';

@ApiTags('Connection Requests')
@ApiBearerAuth()
@Controller('connection-requests')
export class ConnectionRequestsController {
  constructor(
    private readonly connectionRequestsService: ConnectionRequestsService
  ) {}

  @Post()
  createOne(
    @Body() createConnectionRequestDto: CreateConnectionRequestDto,
    @User() currUser: CurrentUser
  ) {
    return this.connectionRequestsService.createOne(
      createConnectionRequestDto,
      currUser.id
    );
  }

  @Get()
  findMany(@User() currUser: CurrentUser) {
    return this.connectionRequestsService.findMany(currUser.id);
  }

  @Patch(':connectionRequestId/accept')
  acceptOne(
    @Param('connectionRequestId', ParseUUIDPipe) connectionRequestId: string
  ) {
    return this.connectionRequestsService.acceptOne(connectionRequestId);
  }

  @Patch(':connectionRequestId/reject')
  rejectOne(
    @Param('connectionRequestId', ParseUUIDPipe) connectionRequestId: string
  ) {
    return this.connectionRequestsService.rejectOne(connectionRequestId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':connectionRequestId')
  deleteOneById(
    @Param('connectionRequestId', ParseUUIDPipe) connectionRequestId: string
  ) {
    return this.connectionRequestsService.deleteOneById(connectionRequestId);
  }
}
