import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderingsService } from './orderings.service';
import { CreateOrderingDto } from './dto/create-ordering.dto';
import { UpdateOrderingDto } from './dto/update-ordering.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@ApiBearerAuth()
@ApiTags('orderings')

@Controller('orderings')
export class OrderingsController {
  constructor(private readonly orderingsService: OrderingsService) {}

  @Post(':restaurantId')
 async create(@Param('restaurantId') restaurantId: string,
    @Body() createOrderingDto: CreateOrderingDto) {
    return await this.orderingsService.create(createOrderingDto,restaurantId);
  }

  @Get()
  findAll() {
    return this.orderingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderingsService.findOne(id);
  }

  @Patch(':restaurantId')
  update(@Param('restaurantId') restaurantId: string,
    @Body() updateOrderingDto: UpdateOrderingDto) {
    return this.orderingsService.update(restaurantId, updateOrderingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderingsService.remove(id);
  }
}
