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
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto, UserDto } from './dtos';
import type { EntityId } from '@/shared/entities';
import { SerializeInterceptor } from '@/shared/interceptors';

@ApiTags('Users')
@UseInterceptors(new SerializeInterceptor(UserDto))
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
  findOneById(@Param('userId', ParseUUIDPipe) userId: EntityId) {
    return this.usersService.findOneById(userId);
  }

  @ApiBadRequestResponse({})
  @ApiNotFoundResponse()
  @Patch(':userId')
  updateOneById(
    @Param('userId', ParseUUIDPipe) userId: EntityId,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateOneById(userId, updateUserDto);
  }

  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOneById(@Param('userId', ParseUUIDPipe) userId: EntityId) {
    return this.usersService.deleteOneById(userId);
  }
}
