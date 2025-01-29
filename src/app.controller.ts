import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ServerStatus } from './dto/server-status';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({ type: ServerStatus, isArray: false })
  @Get('/isAlive')
  isAlive(): ServerStatus {
    return this.appService.isAlive();
  }
}
