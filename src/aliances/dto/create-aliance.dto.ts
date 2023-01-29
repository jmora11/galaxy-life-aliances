import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateMemberDto } from 'src/members/dto/create-member.dto';

export class CreateAlianceDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  user_id: string;

  @IsString()
  @IsOptional()
  @IsIn(['in war', 'normal'])
  status?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  level?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  rank?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  wars_won?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  wars_lost?: number;
}
