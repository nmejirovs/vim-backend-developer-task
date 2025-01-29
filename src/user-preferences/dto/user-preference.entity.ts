import { ApiProperty } from "@nestjs/swagger";

export class Preferences {
    @ApiProperty()
    email: boolean;
    
    @ApiProperty()
    sms: boolean;
}

export class UserPreferenceEntity {
    userId: number;
    email: string;
    telephone: string;
    preferences: Preferences;
}
