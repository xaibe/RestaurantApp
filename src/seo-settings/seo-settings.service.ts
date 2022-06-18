import { Injectable } from '@nestjs/common';
import { CreateSeoSettingDto } from './dto/create-seo-setting.dto';
import { UpdateSeoSettingDto } from './dto/update-seo-setting.dto';

@Injectable()
export class SeoSettingsService {
  create(createSeoSettingDto: CreateSeoSettingDto) {
    return 'This action adds a new seoSetting';
  }

  findAll() {
    return `This action returns all seoSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seoSetting`;
  }

  update(id: number, updateSeoSettingDto: UpdateSeoSettingDto) {
    return `This action updates a #${id} seoSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} seoSetting`;
  }
}
