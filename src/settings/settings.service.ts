import { RestaurantsService } from './../restaurants/restaurants.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from '@prisma/client';

@Injectable()
export class SettingsService {
  constructor(private prisma:PrismaService,private restaurantsService:RestaurantsService){}
 
  async create(setting: CreateSettingDto, restaurantId) {
    const check = await this.restaurantsService.findOne(restaurantId);
    if (check.setting.length != 0) {
      throw new UnauthorizedException("settings for this restaurant already exists");   
    } else {
      const result = await this.prisma.setting.create({
        data: {
          Name: setting.Name,
          IsOpen: setting.IsOpen,
          showOnFront: setting.showOnFront,
          status: setting.status,
          PaymentType: setting.PaymentType,
          shopLink: setting.shopLink,
          Chain: setting.Chain,
          Description: setting.Description,
          agreementSigned: setting.agreementSigned,
          logoImgLink: setting.logoImgLink,
          lpImgMobileLink: setting.lpImgMobileLink,
          lpImgDesktopLink: setting.lpImgDesktopLink,
          bannerText: setting.bannerText,
          accountManagerId: setting.accountManagerId,
          restaurantId: restaurantId,
        },
      });
      console.log("result", result);

      return result;
    }
  }

  async findAll(): Promise<Setting[]> {
    return await this.prisma.setting.findMany({
      include: { 
      restaurant : true,},
    });
  }


async findOne(id) {
  console.log("id in get settings by id",id);
  const setting = await this.prisma.setting.findUnique({
    where: {id:id},
    include: { 
      restaurant : true,
               },
  });
  if (!setting) {
    throw new NotFoundException("setting with this id is not found");
  } else {
    return setting;
  }

}


async remove(id){
console.log("id in remove setting",id);

  const setting = await this.prisma.setting.delete({
    where: { id: id },
  });
  return setting;
}


  async update(id, setting: UpdateSettingDto) {
    console.log("id in settings update", id);
    console.log("settings in setting update", setting);
    const restaurant = await this.restaurantsService.findOne(id);  
    console.log("setting id", restaurant.setting[0].id);
  const result = await this.prisma.setting.update({
      where:{id : restaurant.setting[0].id},
      data: {
        Name: setting.Name,
        IsOpen: setting.IsOpen,
        showOnFront: setting.showOnFront,
        status: setting.status,
        PaymentType: setting.PaymentType,
        shopLink: setting.shopLink,
        Chain: setting.Chain,
        Description: setting.Description,
        agreementSigned: setting.agreementSigned,
        logoImgLink: setting.logoImgLink,
        lpImgMobileLink:  setting.lpImgMobileLink,
        lpImgDesktopLink: setting.lpImgDesktopLink,
        bannerText       : setting.bannerText,
        accountManagerId: setting.accountManagerId,
     
    },
  });
    console.log("result",result);
    
    return result;
  }

}
