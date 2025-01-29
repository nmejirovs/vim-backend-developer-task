import { Preferences } from "./user-preference.entity";

export class UserPreferenceDto {
    email: string;
    telephone: string;
    preferences: Preferences;
}
