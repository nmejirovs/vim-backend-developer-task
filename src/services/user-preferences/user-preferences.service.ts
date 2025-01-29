import { Injectable, Logger } from '@nestjs/common';
import { maxBy, pick } from 'lodash';
import { UserPreferenceEntity, Preferences } from '../../entities/user-preference.entity';
import { log } from 'console';

@Injectable()
export class UserPreferencesService {

    private userPreferences: UserPreferenceEntity[] = [];
    private readonly logger = new Logger(UserPreferencesService.name);

    async getUsersPreferences():Promise<UserPreferenceEntity[]> {
        this.logger.verbose('Getting users preferences');
        return this.userPreferences;
    }

    async getUserPreferences(searchParams: {
        userId?: number;
        email?: string;
    }):Promise<UserPreferenceEntity> {
        this.logger.verbose('Getting users preferences');
        return this.userPreferences.find((up) => { 
            return (!searchParams.userId || up.userId === searchParams.userId) && (!searchParams.email || up.email === searchParams.email);
         }) as UserPreferenceEntity;
    }

    async createUserPreference(userPreference: {
        email: string;
        telephone: string;
        preferences: Preferences;
    }): Promise<void> {
        this.logger.verbose(`Creating user preference ${JSON.stringify(userPreference)}`);
        const maxId = maxBy(this.userPreferences, 'userId')?.userId || 0;
        this.userPreferences.push({ ... userPreference, userId: maxId + 1 });
    }

    async updateUserPreference(userId: number, userPreference: {
        email: string;
        telephone: string;
        preferences: Preferences;
    }): Promise<void> {
        this.logger.verbose(`Updating user preference ${userId} with ${JSON.stringify(userPreference)}`);
        this.userPreferences = this.userPreferences.map((up) => {
            if (up.userId === userId) {
                return {...up, ...userPreference};
            }
            return up;
        });
    }

}
