import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class SendNotificationRequestDto {

    @ApiPropertyOptional({required: false, description: 'User identifier, Must be provided if email is not provided'}) 
    @ValidateIf(dto => typeof dto.email === 'undefined')
    userId?: number;

    @ApiPropertyOptional({required: false, description: 'User email, Must be provided if userId is not provided'})
    @ValidateIf(dto => typeof dto.userId === 'undefined')
    email?: string;
    
    @ApiProperty({required: true, description: 'Message to be sent'})
    @IsNotEmpty()
    message: string;
}