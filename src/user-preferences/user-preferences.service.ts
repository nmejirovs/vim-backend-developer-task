import { Injectable, Logger } from '@nestjs/common';
import { UserPreferenceDto, UpsertUserPreferenceDto } from './dto/user-preference.dto';
import { maxBy, pick } from 'lodash';
import { UserPreferenceEntity } from './dto/user-preference.entity';
import { log } from 'console';

@Injectable()
export class UserPreferencesService {

    private userPreferences: UserPreferenceEntity[] = [];
    private readonly logger = new Logger(UserPreferencesService.name);

    async getUsersPreferences():Promise<UserPreferenceDto[]> {
        this.logger.verbose('Getting users preferences');
        return this.userPreferences as UserPreferenceDto[];
    }

    async createUserPreference(userPreference: UpsertUserPreferenceDto): Promise<void> {
        this.logger.verbose(`Creating user preference ${JSON.stringify(userPreference)}`);
        const maxId = maxBy(this.userPreferences, 'userId')?.userId || 0;
        this.userPreferences.push({ ... userPreference, userId: maxId + 1 });
    }

    async updateUserPreference(userId: number, userPreference: UpsertUserPreferenceDto): Promise<void> {
        this.logger.verbose(`Updating user preference ${userId} with ${JSON.stringify(userPreference)}`);
        this.userPreferences = this.userPreferences.map((up) => {
            if (up.userId === userId) {
                return {...up, ...userPreference};
            }
            return up;
        });
    }

}
