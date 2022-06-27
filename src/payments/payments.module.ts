import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService,PrismaService]
})
export class PaymentsModule {}
