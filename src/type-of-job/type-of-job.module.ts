import { Module } from '@nestjs/common';
import { TypeOfJobService } from './type-of-job.service';
import { TypeOfJobController } from './type-of-job.controller';

@Module({
  controllers: [TypeOfJobController],
  providers: [TypeOfJobService],
})
export class TypeOfJobModule {}
