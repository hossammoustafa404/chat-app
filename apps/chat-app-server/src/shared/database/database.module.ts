import { User } from '@/modules/users/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        port: +process.env.PG_PORT,
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        entities: [User],
        synchronize: process.env.NODE_ENV === 'development' ? true : false,
      }),
    }),
  ],
})
export class DatabaseModule {}
