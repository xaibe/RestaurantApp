import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeoSettingsService } from './seo-settings.service';
import { CreateSeoSettingDto } from './dto/create-seo-setting.dto';
import { UpdateSeoSettingDto } from './dto/update-seo-setting.dto';

@Controller('seo-settings')
export class SeoSettingsController {
  constructor(private readonly seoSettingsService: SeoSettingsService) {}

  @Post()
  create(@Body() createSeoSettingDto: CreateSeoSettingDto) {
    return this.seoSettingsService.create(createSeoSettingDto);
  }

  @Get()
  findAll() {
    return this.seoSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seoSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeoSettingDto: UpdateSeoSettingDto) {
    return this.seoSettingsService.update(+id, updateSeoSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seoSettingsService.remove(+id);
  }
}
