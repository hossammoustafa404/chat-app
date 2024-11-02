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
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto, UserDto } from './dtos';
import { SerializeInterceptor } from '@/shared/interceptors';
import { CurrentUser, User } from '@/shared/decorators';

@ApiTags('Users')
@ApiBearerAuth()
@UseInterceptors(new SerializeInterceptor(UserDto))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findMany(@User() currentUser: CurrentUser) {
    return this.usersService.findMany();
  }

  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Get(':userId')
  findOneById(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.usersService.findOneById(userId);
  }

  @ApiBadRequestResponse({})
  @ApiNotFoundResponse()
  @Patch(':userId')
  updateOneById(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateOneById(userId, updateUserDto);
  }

  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOneById(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.usersService.deleteOneById(userId);
  }
}
