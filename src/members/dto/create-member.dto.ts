import { IsIn, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  nick_name: string;

  @IsString()
  level: number;

  @IsString()
  war_points: number;

  @IsString()
  @IsIn(['General', 'Capitain', 'Private'])
  role: string;
}
