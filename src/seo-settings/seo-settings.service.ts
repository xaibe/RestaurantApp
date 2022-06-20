import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateSeoSettingDto } from './dto/create-seo-setting.dto';
import { UpdateSeoSettingDto } from './dto/update-seo-setting.dto';
import { SeoSetting } from '@prisma/client';

@Injectable()
export class SeoSettingsService {
  constructor(private restaurantsService: RestaurantsService,
    private prisma: PrismaService) { }

  async create(seoSetting: CreateSeoSettingDto, restaurantId) {
    const check = await this.restaurantsService.findOne(restaurantId);
    if (check.seoSetting.length != 0) {
      throw new UnauthorizedException("SEOSettings for this restaurant already exists");   
    } else {
      const result = await this.prisma.seoSetting.create({
        data: {
  GMBDomain : seoSetting.GMBDomain, 
  ownWebsiteLink  :seoSetting.ownWebsiteLink,
  IsDomainLocked   :seoSetting.IsDomainLocked,
  PriceRange       :seoSetting.PriceRange,
  GMBStatus        :seoSetting.GMBStatus,
  GMBRole          :seoSetting.GMBRole,
  GMBEmail         :seoSetting.GMBEmail,
  GMBPassword      :seoSetting.GMBPassword,
  GMBOwner        :seoSetting.GMBOwner,
  AppleMapEmail: seoSetting.AppleMapEmail,
  AppleMapPassword :seoSetting.AppleMapPassword,
  AppleMapOwner    :seoSetting.AppleMapPassword,
  AppleMapStatus   :seoSetting.AppleMapStatus,
  restaurantId: restaurantId,
        },
      });
      console.log("result", result);

      return result;
    }
  }

  
  async findAll(): Promise<SeoSetting[]> {
    return await this.prisma.seoSetting.findMany({
      include: { 
      restaurant : true,},
    });
  }


async findOne(id) {
  console.log("id in get settings by id",id);
  const seoSetting = await this.prisma.seoSetting.findUnique({
    where: {id:id},
    include: { 
      restaurant : true,
               },
  });
  if (!seoSetting) {
    throw new NotFoundException("seoSetting with this id is not found");
  } else {
    return seoSetting;
  }

}


async remove(id){
console.log("id in remove SEO-Setting",id);

  const seoSetting = await this.prisma.seoSetting.delete({
    where: { id: id },
  });
  return seoSetting;
}



 async update(id, seoSetting: UpdateSeoSettingDto) {
    console.log("id in settings update", id);
    console.log("settings in setting update", seoSetting);
    const restaurant = await this.restaurantsService.findOne(id);  
    console.log("setting id", restaurant.seoSetting[0].id);
  const result = await this.prisma.seoSetting.update({
      where:{id : restaurant.seoSetting[0].id},
    data: {
      GMBDomain : seoSetting.GMBDomain, 
      ownWebsiteLink  :seoSetting.ownWebsiteLink,
      IsDomainLocked   :seoSetting.IsDomainLocked,
      PriceRange       :seoSetting.PriceRange,
      GMBStatus        :seoSetting.GMBStatus,
      GMBRole          :seoSetting.GMBRole,
      GMBEmail         :seoSetting.GMBEmail,
      GMBPassword      :seoSetting.GMBPassword,
      GMBOwner        :seoSetting.GMBOwner,
      AppleMapEmail: seoSetting.AppleMapEmail,
      AppleMapPassword :seoSetting.AppleMapPassword,
      AppleMapOwner    :seoSetting.AppleMapPassword,
      AppleMapStatus: seoSetting.AppleMapStatus
    },
  });
    console.log("result",result);
    
    return result;
  }

}
