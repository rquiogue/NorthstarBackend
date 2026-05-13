import { Module } from '@nestjs/common';
import { ServiceModule } from '@/modules/service/service.module';

@Module({
  imports: [ServiceModule],
})
export class AppModule {}
