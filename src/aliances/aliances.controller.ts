import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { GlobalExceptionFilter } from '../utils/exception.filter';
import { AliancesService } from './aliances.service';
import { CreateAlianceDto } from './dto/create-aliance.dto';
import { UpdateAlianceDto } from './dto/update-aliance.dto';

@Controller('aliances')
@UseFilters(new GlobalExceptionFilter())
export class AliancesController {
  constructor(private readonly aliancesService: AliancesService) {}

  @Post()
  create(@Body() createAlianceDto: CreateAlianceDto) {
    return this.aliancesService.create(createAlianceDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.aliancesService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.aliancesService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlianceDto: UpdateAlianceDto,
  ) {
    return this.aliancesService.update(id, updateAlianceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.aliancesService.remove(id);
  }
}
