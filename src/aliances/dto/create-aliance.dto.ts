import {
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAlianceDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @IsOptional()
  @IsIn(['without necessary members', 'in war', 'normal'])
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
