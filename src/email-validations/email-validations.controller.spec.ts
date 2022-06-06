import { Test, TestingModule } from '@nestjs/testing';
import { EmailValidationsController } from './email-validations.controller';

describe('EmailValidationsController', () => {
  let controller: EmailValidationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailValidationsController],
    }).compile();

    controller = module.get<EmailValidationsController>(EmailValidationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
