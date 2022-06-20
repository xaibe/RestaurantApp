import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from '@prisma/client';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService,
  private restaurantsService:RestaurantsService) { }

  async create(location: CreateLocationDto, restaurantId) {
    const check = await this.restaurantsService.findOne(restaurantId);
    if (check.location.length != 0) {
      throw new UnauthorizedException("location for this restaurant already exists");
    } else {
      const result = await this.prisma.location.create({
        data: {
          RestaurantAddress :location.RestaurantAddress,
          RestaurantCity      :location.RestaurantCity,
          RestaurantState     :location.RestaurantZipCode,
          RestaurantZipCode   :location.RestaurantZipCode,
          RestaurantLatitude  :location.RestaurantLatitude,
          RestaurantLongitude :location.RestaurantLongitude,
          RestaurantTimeZone  :location.RestaurantTimeZone,
          restaurantId: restaurantId,
        },
      });
      console.log("result", result);

      return result;
    }
  }

  async findAll() {
    return await this.prisma.location.findMany({
      include: { 
      restaurant : true,},
    });
  }

 

async findOne(id) {
  console.log("id in get location by id",id);
  const location = await this.prisma.location.findUnique({
    where: {id:id},
    include: { 
      restaurant : true,
               },
  });
  if (!location) {
    throw new NotFoundException("location with this id is not found");
  } else {
    return location;
  }

}


async remove(id){
console.log("id in remove location",id);

  const location = await this.prisma.location.delete({
    where: { id: id },
  });
  return location;
}


  async update(restaurantId, location: UpdateLocationDto) {
    const restaurant = await this.restaurantsService.findOne(restaurantId);  
  const result = await this.prisma.location.update({
      where:{id : restaurant.location[0].id},
      data: {
        RestaurantAddress :location.RestaurantAddress,
          RestaurantCity      :location.RestaurantCity,
          RestaurantState     :location.RestaurantZipCode,
          RestaurantZipCode   :location.RestaurantZipCode,
          RestaurantLatitude  :location.RestaurantLatitude,
          RestaurantLongitude :location.RestaurantLongitude,
          RestaurantTimeZone  :location.RestaurantTimeZone,
     
    },
  });
    console.log("result",result);
    
    return result;
  }

}
