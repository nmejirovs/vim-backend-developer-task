import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse,  } from '@nestjs/swagger';
import { NotificationService } from '../services/notification/notification.service';
import { SendNotificationRequestDto } from 'src/notifications/dto/notifications.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('notification')
export class NotificationsController {
    constructor(private readonly notificationService: NotificationService) {}

    private readonly logger = new Logger(NotificationsController.name);

    @Post()
    @UseGuards(AuthGuard) 
    @ApiOkResponse({description: 'At least one of fields email or userId must be provided'})
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
