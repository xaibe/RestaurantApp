import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService,
    private restaurantsService:RestaurantsService) { }
  
  async create(order: CreateOrderDto, restaurantId) {
    
      const result = await this.prisma.order.create({
        data: {
          customerName       : order.customerName,
          customerPhoneNumber :order.customerPhoneNumber,
          Status            :  order.Status,
          restaurantId: restaurantId,
        },
      });
      console.log("result", result);

      return result;
  }

  async findAll() {
    return await this.prisma.order.findMany({
      include: { 
      restaurant : true,},
    });
  }

 

async findOne(id) {
  console.log("id in get orders by id",id);
  const order = await this.prisma.order.findUnique({
    where: {id:id},
    include: { 
      restaurant : true,
               },
  });
  if (!order) {
    throw new NotFoundException("order with this id is not found");
  } else {
    return order;
  }

}


async remove(id){
console.log("id in remove order",id);

  const order = await this.prisma.order.delete({
    where: { id: id },
  });
  return order;
}


  async update(id, order: UpdateOrderDto) {
  const result = await this.prisma.order.update({
      where:{id : id},
      data: {
        customerName       : order.customerName,
        customerPhoneNumber :order.customerPhoneNumber,
        Status            :  order.Status,
   
    },
  });
    console.log("result",result);
    
    return result;
  }
  
}
