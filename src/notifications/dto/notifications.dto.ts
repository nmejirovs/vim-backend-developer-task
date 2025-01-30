import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class SendNotificationRequestDto {

    @ApiPropertyOptional({required: false}) 
    @ValidateIf(dto => typeof dto.email === 'undefined')
    userId?: number;

    @ApiPropertyOptional({required: false})
    @ValidateIf(dto => typeof dto.userId === 'undefined')
    email?: string;
    
    @ApiProperty({required: true})
    @IsNotEmpty()
    message: string;
}