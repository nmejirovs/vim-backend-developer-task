import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Preferences {
    @ApiProperty({required: true})
    email: boolean;
    
    @ApiProperty({required: true})
    sms: boolean;
}

export class UserPreferenceDto {
    @ApiProperty({type: Number})
    userId: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    telephone: string;

    @ApiProperty()
    preferences: Preferences;
}

export class UpsertUserPreferenceDto {
    @ApiPropertyOptional({required: false})
    email: string;

    @ApiPropertyOptional({required: false})
    telephone: string;

    @ApiProperty({required: true})
    preferences: Preferences;
}
