import { Body, Controller, Get, Post, Put, Logger, ValidationPipe, UseGuards, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { pick } from 'lodash'
import { InsertUserPreferenceDto, UpdateUserPreferenceDto, UserPreferenceDto } from './dto/user-preference.dto';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { LocalhostGuard } from 'src/localhost/localhost.guard';
import {validate} from 'class-validator';
import DuplicateEntryError from '../errors/duplicate-entry-error';
import UserNotFoundError from '../errors/user-not-found-error';



@Controller('user-preferences')
export class UserPreferencesController {
    constructor(private readonly userPreferencesService: UserPreferencesService) {}

    private readonly logger = new Logger(UserPreferencesController.name);


    @Get()
    @UseGuards(LocalhostGuard) 
    @ApiOkResponse({ type: UserPreferenceDto, isArray: true, description: 'Get list of users. Available only on localhost' })
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
    @ApiOkResponse({description: 'Add user.'})
    async createUserPreference(@Body(new ValidationPipe()) userPreference: InsertUserPreferenceDto): Promise<void> {
 
        try {
            return await this.userPreferencesService.createUserPreference(userPreference);
        } catch (error) {
            // no need to add log on every level since error has stack trace
            this.logger.error('Error on creating user preferences', error);

            if (error instanceof DuplicateEntryError) {
                throw new InternalServerErrorException("User already exists");
            }

            throw new Error('Error on creating user preferences');
        }
    }

    @Put()
    @UseGuards(AuthGuard) 
    @ApiOkResponse({description: 'Update user details.'})
    async updateUserPreference(@Body(new ValidationPipe()) userPreference: UpdateUserPreferenceDto): Promise<void> {
        try {
            return await this.userPreferencesService.updateUserPreference(userPreference);
        } catch (error) {
            // no need to add log on every level since error has stack trace
            this.logger.error('Error on updating user preferences', error);

            if(error instanceof UserNotFoundError) {
                throw new NotFoundException("User not found");
            }

            throw new Error('Error on updating user preferences');
        }
    }

}
