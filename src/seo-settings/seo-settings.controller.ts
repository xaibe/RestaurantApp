import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeoSettingsService } from './seo-settings.service';
import { CreateSeoSettingDto } from './dto/create-seo-setting.dto';
import { UpdateSeoSettingDto } from './dto/update-seo-setting.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('SEOSettings')
@Controller('seo-settings')
export class SeoSettingsController {
  constructor(private readonly seoSettingsService: SeoSettingsService) {}

  @Post(':restaurantId')
async create(@Param('restaurantId') restaurantId: string,
    @Body() createSeoSettingDto: CreateSeoSettingDto) {
    return await this.seoSettingsService.create(createSeoSettingDto,restaurantId);
  }

  @Get()
 async findAll() {
    return await this.seoSettingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.seoSettingsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSeoSettingDto: UpdateSeoSettingDto) {
    return await this.seoSettingsService.update(id, updateSeoSettingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.seoSettingsService.remove(id);
  }
}
