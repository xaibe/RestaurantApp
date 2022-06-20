import { EmailValidationsService } from 'src/email-validations/email-validations.service';
import { EmailsService } from './../emails/emails.service';
import { PasswordsService } from 'src/passwords/passwords.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { Module } from '@nestjs/common';
import { SeoSettingsService } from './seo-settings.service';
import { SeoSettingsController } from './seo-settings.controller';

@Module({
  controllers: [SeoSettingsController],
  providers: [SeoSettingsService,RestaurantsService,PrismaService,UsersService,PasswordsService,EmailsService,EmailValidationsService]
})
export class SeoSettingsModule {}
