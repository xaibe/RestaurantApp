import { PartialType } from '@nestjs/swagger';
import { CreateSeoSettingDto } from './create-seo-setting.dto';

export class UpdateSeoSettingDto extends PartialType(CreateSeoSettingDto) {}
