import { Injectable } from '@nestjs/common';
import { CreateOrderingDto } from './dto/create-ordering.dto';
import { UpdateOrderingDto } from './dto/update-ordering.dto';

@Injectable()
export class OrderingsService {
  create(createOrderingDto: CreateOrderingDto) {
    return 'This action adds a new ordering';
  }

  findAll() {
    return `This action returns all orderings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordering`;
  }

  update(id: number, updateOrderingDto: UpdateOrderingDto) {
    return `This action updates a #${id} ordering`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordering`;
  }
}
