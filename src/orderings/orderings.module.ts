import { Module } from '@nestjs/common';
import { OrderingsService } from './orderings.service';
import { OrderingsController } from './orderings.controller';

@Module({
  controllers: [OrderingsController],
  providers: [OrderingsService]
})
export class OrderingsModule {}
