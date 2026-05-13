import { Module } from '@nestjs/common';
import { MockRepository } from '@/data/mock.repository';
import { ServiceController } from '@/modules/service/service.controller';
import { ServiceService } from '@/modules/service/service.service';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, MockRepository],
})
export class ServiceModule {}
