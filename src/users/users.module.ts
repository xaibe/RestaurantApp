import { Module } from '@nestjs/common';
import { PasswordsService } from 'src/passwords/passwords.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule],
  providers: [UsersService, PasswordsService],
})
export class UsersModule {}
