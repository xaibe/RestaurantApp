import { EmailValidationsService } from 'src/email-validations/email-validations.service';
import { EmailsService } from './../emails/emails.service';
import { PasswordsService } from 'src/passwords/passwords.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService,UsersService,PrismaService,PasswordsService,EmailsService,EmailValidationsService]
})
export class RestaurantsModule {}
