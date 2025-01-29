import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ServerStatus } from './types/server-status';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/isAlive')
  isAlive(): ServerStatus {
    return this.appService.isAlive();
  }
}
