import { Injectable, Logger } from '@nestjs/common';
import { maxBy,  } from 'lodash';
import { UserPreferenceEntity, Preferences } from '../../entities/user-preference.entity';
import DuplicateEntryError from '../../errors/duplicate-entry-error';
import UserNotFoundError from '../../errors/user-not-found-error';

@Injectable()
export class UserPreferencesService {

    private static userPreferences: UserPreferenceEntity[] = [];
    private readonly logger = new Logger(UserPreferencesService.name);

    async getUsersPreferences():Promise<UserPreferenceEntity[]> {
        this.logger.debug('Getting users preferences');
        return UserPreferencesService.userPreferences;
    }

    async getUserPreferences(searchParams: {
        userId?: number;
        email?: string;
    }):Promise<UserPreferenceEntity> {
        this.logger.debug('Getting users preferences');
        if(!UserPreferencesService.userPreferences.find((up) => up.email === searchParams.email || up.userId === searchParams.userId)) {
            throw new UserNotFoundError(`User with email ${searchParams.email} not found`);
        }
        return UserPreferencesService.userPreferences.find((up) => { 
            return (!searchParams.userId || up.userId === searchParams.userId) && (!searchParams.email || up.email === searchParams.email);
         }) as UserPreferenceEntity;
    }

    async createUserPreference(userPreference: {
        email: string;
        telephone: string;
        preferences: Preferences;
    }): Promise<void> {
        this.logger.debug(`Creating user preference ${JSON.stringify(userPreference)}`);
        if(UserPreferencesService.userPreferences.find((up) => ( up.email && userPreference.email && up.email === userPreference.email ) || ( up.telephone && userPreference.telephone && up.telephone === userPreference.telephone ))) {
            throw new DuplicateEntryError(`User with email ${userPreference.email} or telephone ${userPreference.telephone} already exists`);
        }
        const maxId = maxBy(UserPreferencesService.userPreferences, 'userId')?.userId || 0;
        UserPreferencesService.userPreferences.push({ ... userPreference, userId: maxId + 1 });
    }

    async updateUserPreference(userPreference: {
        email: string;
        preferences: Preferences;
    }): Promise<void> {
        this.logger.debug(`Updating user preference ${userPreference.email} with ${JSON.stringify(userPreference)}`);
        if(!UserPreferencesService.userPreferences.find((up) => up.email === userPreference.email)) {
            throw new UserNotFoundError(`User with email ${userPreference.email} not found`);
        }
        UserPreferencesService.userPreferences = UserPreferencesService.userPreferences.map((up) => {
            if (up.email === userPreference.email) {
                return {...up, preferences: {...userPreference.preferences}};
            }
            return up;
        });
    }

}
