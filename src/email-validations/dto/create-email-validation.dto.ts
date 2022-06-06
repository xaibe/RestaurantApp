import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateEmailValidationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hash: string;

  @ApiHideProperty()
  user: Prisma.UserCreateNestedOneWithoutEmailValidationsInput;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  userId: string;
}
