
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma:PrismaService){}
 async create(orderId,createdBy,payment: CreatePaymentDto) {
      const result = await this.prisma.payment.create({
        data: {
          ownerEmail :payment.ownerEmail,
          statementType: payment.statementType,
          payoutFrequency: payment.payoutFrequency,
          feeFlatAmount:payment.feeFlatAmount,
          feePercentageAmount:payment.feePercentageAmount,
          trialEndDate: payment.trialEndDate,
          processingFeePercentage : payment.processingFeePercentage,
          orderReceiveType :payment.orderReceiveType,
          createdBy:createdBy,
          orderId:orderId,
},
      });
      console.log("result", result);

      return result;
    } 
  
    async findAll() {
      return await this.prisma.payment.findMany({
        include: { 
          order:true},
      });
    }
    
   
  
  async findOne(id) {
    console.log("id in get payments by id",id);
    const payment = await this.prisma.payment.findUnique({
      where: {id:id},
      include: { 
        order:true,
                 },
    });
    if (!payment) {
      throw new NotFoundException("payment with this id is not found");
    } else {
      return payment;
    }
  
  }
  
  
  async remove(id){
  console.log("id in remove payment",id);
  
    const payment = await this.prisma.payment.delete({
      where: { id: id },
    });
    return payment;
  }
  
  
    async update(updatedBy,id, payment: UpdatePaymentDto) {
    const result = await this.prisma.payment.update({
        where:{id : id},
      data: {
          
        ownerEmail :payment.ownerEmail,
        statementType: payment.statementType,
        payoutFrequency: payment.payoutFrequency,
        feeFlatAmount:payment.feeFlatAmount,
        feePercentageAmount:payment.feePercentageAmount,
        trialEndDate: payment.trialEndDate,
        processingFeePercentage : payment.processingFeePercentage,
        orderReceiveType :payment.orderReceiveType,
        updateBy: updatedBy,        
      },
    });
      console.log("result",result);
      
      return result;
    }

}
