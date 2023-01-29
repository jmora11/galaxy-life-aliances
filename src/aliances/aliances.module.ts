import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersModule } from 'src/members/members.module';
import { UsersModule } from 'src/users/users.module';

import { AliancesController } from './aliances.controller';
import { AliancesService } from './aliances.service';
import { Aliance } from './entities/aliance.entity';

@Module({
  controllers: [AliancesController],
  providers: [AliancesService],
  imports: [TypeOrmModule.forFeature([Aliance]), MembersModule, UsersModule],
})
export class AliancesModule {}
