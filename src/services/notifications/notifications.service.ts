import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserPreferencesService } from '../user-preferences/user-preferences.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(UserPreferencesService.name);

    constructor(private readonly userPreferencesService: UserPreferencesService,
        private readonly httpService: HttpService,
        private configService: ConfigService
    ) {}

    async sendNotification(notificationInput: { userId?: number, email?: string, message: string }) {
        this.logger.verbose(`Sending notification to ${notificationInput.userId} with message ${notificationInput.message}`);

        const notificationServerUrl = this.configService.get('notificationServerUrl');

        const userPreferences = await this.userPreferencesService.getUserPreferences({ userId: notificationInput.userId, email: notificationInput.email });

        if (userPreferences.preferences.email) {
            this.logger.verbose(`Sending email to ${userPreferences.email}`);

            this.httpService.post(notificationServerUrl, {}

        }

        if (userPreferences.preferences.sms) {
            this.logger.verbose(`Sending sms to ${userPreferences.telephone}`);
        }
    }
}
