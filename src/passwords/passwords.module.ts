import { EmailsService } from './../emails/emails.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';
import { ConfigService } from '@nestjs/config';
import { EmailValidationsService } from 'src/email-validations/email-validations.service';

@Module({
  controllers: [PasswordsController],
  providers: [PasswordsService, PrismaService,EmailsService,EmailValidationsService,ConfigService],
})
export class PasswordsModule {}
