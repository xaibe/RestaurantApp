import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderingsService } from './orderings.service';
import { CreateOrderingDto } from './dto/create-ordering.dto';
import { UpdateOrderingDto } from './dto/update-ordering.dto';

@Controller('orderings')
export class OrderingsController {
  constructor(private readonly orderingsService: OrderingsService) {}

  @Post()
  create(@Body() createOrderingDto: CreateOrderingDto) {
    return this.orderingsService.create(createOrderingDto);
  }

  @Get()
  findAll() {
    return this.orderingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderingDto: UpdateOrderingDto) {
    return this.orderingsService.update(+id, updateOrderingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderingsService.remove(+id);
  }
}
