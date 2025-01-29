import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserPreferenceDto } from './dto/user-preference.dto';
import { UserPreferencesService } from './user-preferences.service';
import { pick } from 'lodash'

@Controller('user-preferences')
export class UserPreferencesController {
    constructor(private readonly userPreferencesService: UserPreferencesService) {}

    @Get()
    async getUserPreferences(): Promise<UserPreferenceDto[]> {
        return (await this.userPreferencesService.getUserPreferences()).map((entity)=>pick(entity, ['email', 'telephone', 'preferences']));
    }

    @Post()
    async createUserPreference(@Body() userPreference: UserPreferenceDto): Promise<void> {
        return this.userPreferencesService.createUserPreference(userPreference);
    }

}
