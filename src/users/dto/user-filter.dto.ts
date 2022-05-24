import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class UserFilterDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty()
  applicationId?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  lastActivity?: Date;
}
