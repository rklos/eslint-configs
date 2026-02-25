import { Controller, Get } from '@nestjs/common';

@Controller('health')
class HealthController {
  @Get()
  public check(): string {
    return 'ok';
  }
}

export default HealthController;
