import { Body, Controller, Get, Post, Put, Logger, Param, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { pick } from 'lodash'
import { UpsertUserPreferenceDto, UserPreferenceDto } from './dto/user-preference.dto';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { LocalhostGuard } from 'src/localhost/localhost.guard';



@Controller('user')
export class UserPreferencesController {
    constructor(private readonly userPreferencesService: UserPreferencesService) {}

    private readonly logger = new Logger(UserPreferencesController.name);


    validateUpsertFields (userPreference: UpsertUserPreferenceDto) {
        if(!userPreference.email && !userPreference.telephone) {
            throw new Error('At least one of fields email or telephone must be provided');
        }

        if(!userPreference.email && userPreference.preferences.email) {
            throw new Error('Email must be provided if email preference is true');
        }

        if(!userPreference.telephone && userPreference.preferences.sms) {
            throw new Error('Telephone must be provided if sms preference is true');
        }
    }

    @Get()
    @UseGuards(LocalhostGuard) 
    @ApiOkResponse({ type: UserPreferenceDto, isArray: true, description: 'Available only on localhost' })
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
    @UseGuards(AuthGuard) 
    @ApiOkResponse({description: 'At least one of fields email or telephone must be provided'})
    async createUserPreference(@Body() userPreference: UpsertUserPreferenceDto): Promise<void> {
        try {
            this.validateUpsertFields(userPreference);
            return this.userPreferencesService.createUserPreference(userPreference);
        } catch (error) {
            // no need to add log on every level since error has stack trace
            this.logger.error('Error on creating user preferences', error);

            throw new Error('Error on creating user preferences');
        }
    }

    @Put(':userId')
    @UseGuards(AuthGuard) 
    @ApiOkResponse({description: 'At least one of fields email or telephone must be provided'})
    async updateUserPreference(@Body() userPreference: UpsertUserPreferenceDto, @Param('userId', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) userId: number): Promise<void> {
        try {
            this.validateUpsertFields(userPreference);
            return this.userPreferencesService.updateUserPreference(userId, userPreference);
        } catch (error) {
            // no need to add log on every level since error has stack trace
            this.logger.error('Error on updating user preferences', error);

            throw new Error('Error on updating user preferences');
        }
    }

}
