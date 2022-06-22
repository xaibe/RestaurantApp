import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateOrderingDto } from './dto/create-ordering.dto';
import { UpdateOrderingDto } from './dto/update-ordering.dto';
import { UpdateLocationDto } from 'src/locations/dto/update-location.dto';

@Injectable()
export class OrderingsService {
  constructor(private prisma: PrismaService,
  private restaurantsService:RestaurantsService) {}
  
  async create(ordering: CreateOrderingDto, restaurantId) {
   
   
   
    const check = await this.restaurantsService.findOne(restaurantId);
    if (check.ordering.length != 0) {
      throw new UnauthorizedException("ordering for this restaurant already exists");
    } else {
      const result = await this.prisma.ordering.create({
        data: {
          minimumPickUpOrder    :ordering.minimumPickUpOrder,
          minimumDelivery        :ordering.minimumDelivery,
          pickUpEstimate          :ordering.pickUpEstimate,
          deliveryEstimate        :ordering.deliveryEstimate,
          onlineDiscountPercentage :ordering.onlineDiscountPercentage,
          isDeliveryPaused         :ordering.isDeliveryPaused,
          isNoScheduledOrders      :ordering.isNoScheduledOrders,
          stopOrdersForToday       :ordering.stopOrdersForToday,
          restaurantId: restaurantId
        },
      });
      console.log("result", result);

      return result;
    }
}

  
async findAll() {
  return await this.prisma.ordering.findMany({
    include: { 
    restaurant : true,},
  });
}



async findOne(id) {
console.log("id in get ordering by id",id);
const ordering = await this.prisma.ordering.findUnique({
  where: {id:id},
  include: { 
    restaurant : true,
             },
});
if (!ordering) {
  throw new NotFoundException("ordering with this id is not found");
} else {
  return ordering;
}

}


async remove(id){
console.log("id in remove ordering",id);

const ordering = await this.prisma.ordering.delete({
  where: { id: id },
});
return ordering;
}


async update(restaurantId, ordering: UpdateOrderingDto) {
  const restaurant = await this.restaurantsService.findOne(restaurantId);  
const result = await this.prisma.ordering.update({
    where:{id : restaurant.ordering[0].id},
  data: {
    minimumPickUpOrder    :ordering.minimumPickUpOrder,
    minimumDelivery        :ordering.minimumDelivery,
    pickUpEstimate          :ordering.pickUpEstimate,
    deliveryEstimate        :ordering.deliveryEstimate,
    onlineDiscountPercentage :ordering.onlineDiscountPercentage,
    isDeliveryPaused         :ordering.isDeliveryPaused,
    isNoScheduledOrders      :ordering.isNoScheduledOrders,
    stopOrdersForToday       :ordering.stopOrdersForToday,
   
  },
});
  console.log("result",result);
  
  return result;
}
 
}
