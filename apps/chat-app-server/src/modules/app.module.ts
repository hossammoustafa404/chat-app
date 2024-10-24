import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/shared/database/database.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
