import { PartialType } from '@nestjs/swagger';
import { CreateJobDetailDto } from './create-job-detail.dto';

export class UpdateJobDetailDto extends PartialType(CreateJobDetailDto) {}
