import { Controller, Get } from '@nestjs/common';
import { ServiceService } from '@/modules/service/service.service';

@Controller({
  path: 'service',
  version: '1',
})
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  getServiceData() {
    return this.serviceService.getData();
  }
}
