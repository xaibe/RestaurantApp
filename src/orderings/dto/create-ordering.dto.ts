import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderingDto {
    
    @IsNotEmpty()
    @ApiProperty() 
    minimumPickUpOrder: number;
    
    
    @IsNotEmpty()
    @ApiProperty()
    minimumDelivery: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    pickUpEstimate: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    deliveryEstimate: string;
    
    @IsNotEmpty()
    @ApiProperty()
    onlineDiscountPercentage: number;
    
    @IsNotEmpty()
    @ApiProperty()
    isDeliveryPaused: boolean;
    
    @IsNotEmpty()
    @ApiProperty()
    isNoScheduledOrders: boolean;
    
    @IsNotEmpty()
    @ApiProperty()
    stopOrdersForToday: boolean;
}