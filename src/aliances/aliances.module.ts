import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AliancesController } from './aliances.controller';
import { AliancesService } from './aliances.service';
import { Aliance } from './entities/aliance.entity';

@Module({
  controllers: [AliancesController],
  providers: [AliancesService],
  imports: [TypeOrmModule.forFeature([Aliance])],
})
export class AliancesModule {}
