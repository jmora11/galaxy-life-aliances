import { IsIn, IsNumber, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsIn(['General', 'Capitain', 'Private'])
  role: string;

  @IsNumber()
  war_points: number;
}
