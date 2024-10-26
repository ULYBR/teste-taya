import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  constructor() {}

  @Get()
  getStatus(): string {
    return 'API is running!';
  }

  @Get('health')
  getHealth(): string {
    return 'Healthy';
  }
}
