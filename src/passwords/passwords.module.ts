import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';

@Module({
  controllers: [PasswordsController],
  providers: [PasswordsService, PrismaService],
})
export class PasswordsModule {}
