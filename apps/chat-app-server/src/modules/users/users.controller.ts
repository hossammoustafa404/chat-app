import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { UUID } from 'crypto';
import { UpdateUserDto } from './dtos';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findMany() {
    return this.usersService.findMany();
  }

  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Get(':userId')
  findOneById(@Param('userId', ParseUUIDPipe) userId: UUID) {
    return this.usersService.findOneById(userId);
  }

  @ApiBadRequestResponse({})
  @ApiNotFoundResponse()
  @Patch(':userId')
  updateOneById(
    @Param('userId', ParseUUIDPipe) userId: UUID,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateOneById(userId, updateUserDto);
  }

  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOneById(@Param('userId', ParseUUIDPipe) userId: UUID) {
    return this.usersService.deleteOneById(userId);
  }
}
