import { Body, Controller, Logger, NotFoundException, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse,  } from '@nestjs/swagger';
import { NotificationService } from '../services/notification/notification.service';
import { SendNotificationRequestDto } from 'src/notifications/dto/notifications.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import UserNotFoundError from '../errors/user-not-found-error';

@Controller('notification')
export class NotificationsController {
    constructor(private readonly notificationService: NotificationService) {}

    private readonly logger = new Logger(NotificationsController.name);

    @Post()
    @UseGuards(AuthGuard) 
    @ApiOkResponse({description: 'Send notification.'})
    async sendNotification(@Body(new ValidationPipe()) sendNotificationRequest: SendNotificationRequestDto): Promise<void> {
        try {
            return await this.notificationService.sendNotification({
                message: sendNotificationRequest.message, 
                userId: sendNotificationRequest.userId, 
                email: sendNotificationRequest.email
            });
            
        } catch (error) {
            this.logger.error('Error on sending notification', error);

             if(error instanceof UserNotFoundError) {
                throw new NotFoundException("User not found");
            }


            throw new Error('Error on sending notification');
        }
    }

}
