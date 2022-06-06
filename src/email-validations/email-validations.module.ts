import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailValidationsController } from './email-validations.controller';
import { EmailValidationsService } from './email-validations.service';

@Module({
  controllers: [EmailValidationsController],
  imports: [PrismaModule],
  providers: [EmailValidationsService],
})
export class EmailValidationsModule {}
