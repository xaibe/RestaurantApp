import { Test, TestingModule } from '@nestjs/testing';
import { SeoSettingsService } from './seo-settings.service';

describe('SeoSettingsService', () => {
  let service: SeoSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeoSettingsService],
    }).compile();

    service = module.get<SeoSettingsService>(SeoSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
