import { Module } from '@nestjs/common';
import { SeoSettingsService } from './seo-settings.service';
import { SeoSettingsController } from './seo-settings.controller';

@Module({
  controllers: [SeoSettingsController],
  providers: [SeoSettingsService]
})
export class SeoSettingsModule {}
