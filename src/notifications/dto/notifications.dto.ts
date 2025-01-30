import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SendNotificationRequestDto {

    @ApiPropertyOptional({required: false}) 
    userId?: number;

    @ApiPropertyOptional({required: false})
    email?: string;
    
    @ApiProperty({required: true})
    message: string;
}