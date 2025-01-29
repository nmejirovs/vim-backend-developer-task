import { ApiProperty } from "@nestjs/swagger";
import { Preferences } from "./user-preference.entity";

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
