import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from 'src/users/user.response';

export class EmailValidationResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  user?: UserResponse[];
}
