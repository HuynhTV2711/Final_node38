import { PartialType } from '@nestjs/swagger';
import { CreateGroupJobDetail } from './creat-group-job.dto';
export class UpdateGroupJobDetailDto extends PartialType(CreateGroupJobDetail) {}