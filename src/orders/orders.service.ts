import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
