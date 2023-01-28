import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AliancesModule } from './aliances/aliances.module';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { MembersModule } from './members/members.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AliancesModule,
    CommonModule,
    UsersModule,
    MembersModule,
  ],
})
export class AppModule {}
