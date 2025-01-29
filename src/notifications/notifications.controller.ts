import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { NotificationService } from '../services/notification/notification.service';
import { SendNotificationRequestDto } from 'src/notifications/dto/notifications.dto';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationService: NotificationService) {}

    private readonly logger = new Logger(NotificationsController.name);

     @Post()
        @ApiOkResponse()
        async sendNotification(@Body() sendNotificationRequest: SendNotificationRequestDto): Promise<void> {
            try {
                return await this.notificationService.sendNotification({
                    message: sendNotificationRequest.message, 
                    userId: sendNotificationRequest.userId, 
                    email: sendNotificationRequest.email
                });
                
            } catch (error) {
                this.logger.error('Error on sending notification', error);
    
                throw new Error('Error on sending notification');
            }
        }

}
