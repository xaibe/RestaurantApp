import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLocationDto {
    @ApiProperty()
    @IsString()
    RestaurantAddress: string;
    
    @IsString()
    @ApiProperty()
    RestaurantCity: string;
    
    @IsString()
    @ApiProperty()
    RestaurantState: string;
    
    @IsString()
    @ApiProperty()
    RestaurantZipCode: string;
    
    @ApiProperty()
    RestaurantLatitude: number;
    
    @ApiProperty()
    RestaurantLongitude: number;
    
    @IsString()
    @ApiProperty()
    RestaurantTimeZone : string;
}
