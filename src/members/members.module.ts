import { Module } from '@nestjs/common';
import { MembersService } from './members.service';

@Module({
  controllers: [],
  providers: [MembersService],
})
export class MembersModule {}
