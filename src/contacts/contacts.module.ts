import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { EmailValidationsService } from 'src/email-validations/email-validations.service';
import { EmailsService } from 'src/emails/emails.service';
import { PasswordsService } from 'src/passwords/passwords.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService,PrismaService,RestaurantsService,UsersService,PasswordsService,EmailsService,EmailValidationsService]
})
export class ContactsModule {}
