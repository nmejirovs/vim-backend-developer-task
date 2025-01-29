import { ApiProperty } from "@nestjs/swagger";

export class SendNotificationRequestDto {

    @ApiProperty({required: false}) 
    userId?: number;

    @ApiProperty({required: false})
    email?: string;
    
    @ApiProperty()
    message: string;
}