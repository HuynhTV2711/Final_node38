import { PartialType } from '@nestjs/swagger';
import { CreateTypeOfJobDto } from './create-type-of-job.dto';

export class UpdateTypeOfJobDto extends PartialType(CreateTypeOfJobDto) {}
