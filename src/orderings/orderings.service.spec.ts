import { Test, TestingModule } from '@nestjs/testing';
import { OrderingsService } from './orderings.service';

describe('OrderingsService', () => {
  let service: OrderingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderingsService],
    }).compile();

    service = module.get<OrderingsService>(OrderingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
