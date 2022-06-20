import { ApiProperty } from "@nestjs/swagger";
import { GMBStatus, GMBRole, GMBOwner } from "@prisma/client";
import { IsEnum, isEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateSeoSettingDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    GMBDomain: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ownWebsiteLink: string;
    
    @IsNotEmpty()
    @ApiProperty()
    IsDomainLocked: boolean;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    PriceRange: string;
    
    
    @ApiProperty()
    @IsEnum(GMBStatus)
    GMBStatus: GMBStatus;

    @ApiProperty()
    @IsEnum(GMBRole)
    GMBRole: GMBRole;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    GMBEmail: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    GMBPassword: string;

    @ApiProperty()
    @IsEnum(GMBOwner)
    GMBOwner : GMBOwner;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    AppleMapEmail: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    AppleMapPassword: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    AppleMapOwner: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    AppleMapStatus: string;
}
