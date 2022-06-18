import { EmailValidationsService } from 'src/email-validations/email-validations.service';
import { EmailsService } from './../emails/emails.service';
import { Module } from '@nestjs/common';
import { PasswordsService } from 'src/passwords/passwords.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule],
  providers: [UsersService, PasswordsService,EmailsService,EmailValidationsService],
})
export class UsersModule {}
