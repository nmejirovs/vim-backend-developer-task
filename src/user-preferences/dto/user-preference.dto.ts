import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class Preferences {
    @ApiProperty({required: true, description: 'Receive notification via email'})
    @IsNotEmpty()
    email: boolean;
    
    @ApiProperty({required: true, description: 'Receive notification via sms'})
    @IsNotEmpty()
    sms: boolean;
}

@ApiSchema({description: 'User preferences response DTO'})
export class UserPreferenceDto {
    @ApiProperty({type: Number, description: 'Identifier of the user'})
    userId: number;

    @ApiProperty({description: 'Email of the user'})
    email: string;

    @ApiProperty({description: 'Telephone of the user'})
    telephone: string;

    @ApiProperty({type: Preferences, description: 'User preferences'})
    preferences: Preferences;
}

export class InsertUserPreferenceDto {
    @ApiProperty({required: true, description: 'Email of the user'})
    @IsNotEmpty()
    email: string;

    @ApiPropertyOptional({required: false, description: 'Telephone of the user'})
    telephone: string;

    @ApiProperty({required: true, description: 'User preferences'})
    @IsNotEmpty()
    preferences: Preferences;
}

export class UpdateUserPreferenceDto {
    @ApiProperty({required: true, description: 'Email search criteria'})
    @IsNotEmpty()
    email: string;

    @ApiProperty({required: true, description: 'User preferences to uopdate'})
    @IsNotEmpty()
    preferences: Preferences;
}
