import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class Preferences {
    @ApiProperty({required: true})
    @IsNotEmpty()
    email: boolean;
    
    @ApiProperty({required: true})
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
    @ApiPropertyOptional({required: true})
    @IsNotEmpty()
    email: string;

    @ApiPropertyOptional({required: false})
    telephone: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    preferences: Preferences;
}

export class UpdateUserPreferenceDto {
    @ApiPropertyOptional({required: false})
    @IsNotEmpty()
    email: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    preferences: Preferences;
}
