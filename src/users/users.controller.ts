import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Public } from 'src/auth/constants';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { Roles } from './roles.decorator';
import { UsersService } from './users.service';

@Controller({
  path: 'users',
  version: '1',
})
@ApiBearerAuth()
@ApiTags('users')
export class UsersController {
  constructor(private readonly uService: UsersService) {}

  @Get('/getUserById/:id')
  async getById(@Param('id') id: string) {
    return this.uService.getById({ id });
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get('/getAllUser')
  async getAll() {
    return await this.uService.getAll();
  }

  @Public()
  @Post('/Register')
  @ApiCreatedResponse({
    description: 'User created successfully',
    status: HttpStatus.CREATED,
  })
  async create(@Body() data: CreateUserDto) {
    const user = await this.uService.getByEmail(data.emailAddress);
    if (user) {
      throw new BadRequestException('User Already Exists');
    } else {
      const createdAccount = await this.uService.create(data);
      return createdAccount;
    }
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return await this.uService.delete(+id);
  }

}
