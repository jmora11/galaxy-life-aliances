import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MembersService } from './members.service';

@Module({
  controllers: [],
  providers: [MembersService],
  imports: [TypeOrmModule.forFeature([Member])],
  exports: [MembersService],
})
export class MembersModule {}
