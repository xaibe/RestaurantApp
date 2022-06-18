import { Test, TestingModule } from '@nestjs/testing';
import { OrderingsController } from './orderings.controller';
import { OrderingsService } from './orderings.service';

describe('OrderingsController', () => {
  let controller: OrderingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderingsController],
      providers: [OrderingsService],
    }).compile();

    controller = module.get<OrderingsController>(OrderingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
