import { ApiProperty } from "@nestjs/swagger";

export class Preferences {
    @ApiProperty()
    email: boolean;
    
    @ApiProperty()
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
    @ApiProperty()
    email: string;

    @ApiProperty()
    telephone: string;

    @ApiProperty()
    preferences: Preferences;
}
