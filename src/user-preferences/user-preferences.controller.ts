import { Body, Controller, Get, Post, Put, Logger, Param, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { pick } from 'lodash'
import { UpsertUserPreferenceDto, UserPreferenceDto } from './dto/user-preference.dto';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';



@Controller('user-preferences')
export class UserPreferencesController {
    constructor(private readonly userPreferencesService: UserPreferencesService) {}

    private readonly logger = new Logger(UserPreferencesController.name);

    @Get()
    @ApiOkResponse({ type: UserPreferenceDto, isArray: true })
    async getUsersPreferences(): Promise<UserPreferenceDto[]> {
        try {
            return (await this.userPreferencesService.getUsersPreferences()).map((entity)=>pick(entity, ['userId', 'email', 'telephone', 'preferences']));
        } catch (error) {
            // no need to add log on every level since error has stack trace
            this.logger.error('Error on getting user preferences', error);

            throw new Error('Error on getting user preferences');
        }
        
    }

    @Post()
    @ApiOkResponse()
    async createUserPreference(@Body() userPreference: UpsertUserPreferenceDto): Promise<void> {
        try {
            return this.userPreferencesService.createUserPreference(userPreference);
        } catch (error) {
            // no need to add log on every level since error has stack trace
            this.logger.error('Error on creating user preferences', error);

            throw new Error('Error on creating user preferences');
        }
    }

    @Put(':userId')
    @ApiOkResponse()
    async updateUserPreference(@Body() userPreference: UpsertUserPreferenceDto, @Param('userId', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) userId: number): Promise<void> {
        try {
            return this.userPreferencesService.updateUserPreference(userId, userPreference);
        } catch (error) {
            // no need to add log on every level since error has stack trace
            this.logger.error('Error on updating user preferences', error);

            throw new Error('Error on updating user preferences');
        }
    }

}
