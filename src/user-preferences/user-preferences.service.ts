import { Injectable, Get } from '@nestjs/common';
import { UserPreferenceDto } from './dto/user-preference.dto';
import { maxBy, pick } from 'lodash';
import { UserPreferenceEntity } from './dto/user-preference.entity';

@Injectable()
export class UserPreferencesService {

    userPreferences: UserPreferenceEntity[] = [];

    async getUserPreferences():Promise<UserPreferenceEntity[]> {
        return this.userPreferences;
    }

    async createUserPreference(userPreference: UserPreferenceDto): Promise<void> {
        const maxId = maxBy(this.userPreferences, 'id')?.userId || 0;
        this.userPreferences.push({ userId: maxId + 1, ... userPreference});
    }

}
