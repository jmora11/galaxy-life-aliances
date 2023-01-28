import { PartialType } from '@nestjs/mapped-types';
import { CreateAlianceDto } from './create-aliance.dto';

export class UpdateAlianceDto extends PartialType(CreateAlianceDto) {}
