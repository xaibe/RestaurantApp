import { EmailValidationsService } from 'src/email-validations/email-validations.service';
import { EmailsService } from './../emails/emails.service';
import { PasswordsService } from 'src/passwords/passwords.service';
import { UsersService } from 'src/users/users.service';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService,PrismaService,RestaurantsService,UsersService,PasswordsService,EmailsService,EmailValidationsService]
})
export class SettingsModule {}
