import { Test, TestingModule } from '@nestjs/testing';
import { SeoSettingsController } from './seo-settings.controller';
import { SeoSettingsService } from './seo-settings.service';

describe('SeoSettingsController', () => {
  let controller: SeoSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeoSettingsController],
      providers: [SeoSettingsService],
    }).compile();

    controller = module.get<SeoSettingsController>(SeoSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
