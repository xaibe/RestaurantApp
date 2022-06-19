import { ApiProperty } from "@nestjs/swagger";
import { PaymentType, RestaurantStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateSettingDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Name: string;
  
    
    @IsNotEmpty()
    @ApiProperty()
    IsOpen : boolean;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    showOnFront : string;
    
    @ApiProperty()
    @IsEnum(RestaurantStatus)
    status: RestaurantStatus;
    

    @ApiProperty()
    @IsEnum(PaymentType)
    PaymentType: PaymentType;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    shopLink: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Chain: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Description : string;
    
    
    @IsNotEmpty()
    @ApiProperty()
    agreementSigned: Date;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    logoImgLink: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lpImgMobileLink: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lpImgDesktopLink: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    bannerText: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    accountManagerId: string;
}
