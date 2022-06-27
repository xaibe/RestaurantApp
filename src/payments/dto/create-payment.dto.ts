import { ApiProperty } from "@nestjs/swagger";
import { StatementStatus } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class CreatePaymentDto {

    @IsString()
    @ApiProperty()
    ownerEmail: string;
    
    @ApiProperty()
    @IsEnum(StatementStatus)
    statementType: StatementStatus; 
    
    @IsString()
    @ApiProperty()
    payoutFrequency: string;
    
    @ApiProperty()
    feeFlatAmount: number;

    @ApiProperty()
    feePercentageAmount: number;
    
    @ApiProperty()
    trialEndDate: Date;
    
    @ApiProperty()
    processingFeePercentage: number;
    
    @ApiProperty()
    orderReceiveType: string;
    
    }
