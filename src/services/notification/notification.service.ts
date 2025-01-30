import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserPreferencesService } from '../user-preferences/user-preferences.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(UserPreferencesService.name);

    private readonly emailUrl?: string;
    private readonly smsUrl?: string;

    constructor(private readonly userPreferencesService: UserPreferencesService,
        private readonly httpService: HttpService,
        private configService: ConfigService
    ) {
        const notificationServerUrl = this.configService.get('notificationServerUrl');
        this.emailUrl = new URL('send-email', notificationServerUrl).toString();
        this.smsUrl = new URL('send-sms', notificationServerUrl).toString();

    }

    async sendNotification(notificationInput: { userId?: number, email?: string, message: string }): Promise<void> {
        this.logger.debug(`Sending notification to ${notificationInput.userId} with message ${notificationInput.message}`);

        const userPreferences = await this.userPreferencesService.getUserPreferences({ userId: notificationInput.userId, email: notificationInput.email });

        if(!userPreferences) {
            return;
        }

        if (userPreferences.preferences.email && userPreferences.email) {
            try {
                this.logger.debug(`Sending email to ${userPreferences.email}`);
    
                const sendEmailBody = {
                    email: userPreferences.email,
                    message: notificationInput.message
                }
    
                await this.httpService.axiosRef.post(`${this.emailUrl}`, sendEmailBody);

                this.logger.debug(`Email sent to ${userPreferences.email} with message ${notificationInput.message}`);
            } catch (error) {
                this.logger.error('Error on sending email', error);

                throw new Error('Error on sending email');
            }

        }

        if (userPreferences.preferences.sms && userPreferences.telephone) {
            try {
                this.logger.debug(`Sending sms to ${userPreferences.telephone}`);
    
                const sendSmsBody = {
                    telephone: userPreferences.telephone,
                    message: notificationInput.message
                }
    
                await this.httpService.axiosRef.post(`${this.smsUrl}`, sendSmsBody);

                this.logger.debug(`SMS sent to ${userPreferences.telephone} with message ${notificationInput.message}`);
            } catch (error) {
                this.logger.error('Error on sending sms', error);

                throw new Error('Error on sending sms');
            }
        }

        this.logger.debug(`Finished sending notification to ${notificationInput.userId} with message ${notificationInput.message}`);
    }
}
