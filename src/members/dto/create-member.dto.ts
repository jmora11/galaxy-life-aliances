import { IsIn, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsIn(['General', 'Capitain', 'Private'])
  role: string;
}
