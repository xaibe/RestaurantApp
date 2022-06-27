import { Controller, Get,Request, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/constants';
@ApiTags('payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  
  @Post(':orderId')
  create(@Request() req,@Param('orderId') orderId: string, @Body() createPaymentDto: CreatePaymentDto) {
    console.log('orderId', orderId);
    console.log('user', req.user.userName);
    
    
    return this.paymentsService.create(orderId,req.user.userName,createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':orderId')
  update(@Request() req,@Param('orderId') orderId: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(req.user.userName, orderId, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}

