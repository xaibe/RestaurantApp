import { EmailValidationsService } from 'src/email-validations/email-validations.service';
import { EmailsService } from 'src/emails/emails.service';
import { PasswordsService } from 'src/passwords/passwords.service';
import { UsersService } from 'src/users/users.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { OrderingsService } from './orderings.service';
import { OrderingsController } from './orderings.controller';

@Module({
  controllers: [OrderingsController],
  providers: [OrderingsService,PrismaService,RestaurantsService,UsersService,PasswordsService,EmailsService,EmailValidationsService]
})
export class OrderingsModule {}
