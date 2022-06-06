import { IsEmail, Length } from 'class-validator';

export class EmailDto {
  @IsEmail()
  @Length(1, 45)
  email: string;
}
