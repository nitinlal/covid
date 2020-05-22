import { IsEmail } from 'class-validator';

export class StatsDto {
  @IsEmail()
  data: any;
}
