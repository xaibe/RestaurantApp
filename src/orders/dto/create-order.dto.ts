import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    customerName: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    customerPhoneNumber: string;
    
    @ApiProperty()
    Status: OrderStatus;
    
}
