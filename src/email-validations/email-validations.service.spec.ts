import { Test, TestingModule } from '@nestjs/testing';
import { EmailValidationsService } from './email-validations.service';

describe('EmailValidationsService', () => {
  let service: EmailValidationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailValidationsService],
    }).compile();

    service = module.get<EmailValidationsService>(EmailValidationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
