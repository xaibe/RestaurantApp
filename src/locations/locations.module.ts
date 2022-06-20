import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { EmailValidationsService } from 'src/email-validations/email-validations.service';
import { EmailsService } from 'src/emails/emails.service';
import { PasswordsService } from 'src/passwords/passwords.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService,PrismaService,RestaurantsService,UsersService,PasswordsService,EmailsService,EmailValidationsService]
})
export class LocationsModule {}
