export class Preferences {
    email: boolean;
    sms: boolean;
}

export class UserPreferenceEntity {
    userId: number;
    email: string;
    telephone: string;
    preferences: Preferences;
}
