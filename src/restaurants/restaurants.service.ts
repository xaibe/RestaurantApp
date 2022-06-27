import { Restaurant } from './entities/restaurant.entity';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RestaurantsService {
  constructor(private prisma:PrismaService,private usersService:UsersService){}
 
  async create(id:any) {
    const user= await this.usersService.getById(id);
    const newUniqueID=this.generateRandomString(5);
    const result = await this.prisma.restaurant.create({
      data: {
          createdBy: user.userName,
          rest_id: newUniqueID,
        userId: user.id,
      },
    });
console.log("result",result);

    return result;
  }

  generateRandomString(length) {
    const randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    }
    return result;
  }

   

    async findAll(): Promise<Restaurant[]> {
      return await this.prisma.restaurant.findMany({
        include: { 
        ordering : true, 
        order  : true,   
        setting : true,  
        location : true,  
        contact  : true,  
        seoSetting : true,
                 },
      });
    }


 async findOne(id) {
    console.log("id in get restaurant by id",id);
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {id:id},
      include: { 
        ordering : true, 
        order  : true,   
        setting : true,  
        location : true,  
        contact  : true,  
        seoSetting : true,
                 },
    });
    if (!restaurant) {
      throw new NotFoundException("Restaurant with this userId is not found");
    } else {
      return restaurant;
    }

  }


  async remove(id){
    const restaurant = await this.prisma.restaurant.delete({
      where: { id: id },
    });
    return restaurant;
  }

}
