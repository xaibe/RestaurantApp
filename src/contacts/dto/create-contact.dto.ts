import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    OwnerName: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    OwnerEmail: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    OwnerPhone: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    SecondaryContactName: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    SecondaryContactEmail: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    SecondaryContactPhone: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    RestaurantPhone: string;
}
