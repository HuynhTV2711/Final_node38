import { Injectable } from '@nestjs/common';
import { CreateTypeOfJobDto } from './dto/create-type-of-job.dto';
import { UpdateTypeOfJobDto } from './dto/update-type-of-job.dto';

@Injectable()
export class TypeOfJobService {
  create(createTypeOfJobDto: CreateTypeOfJobDto) {
    return 'This action adds a new typeOfJob';
  }

  findAll() {
    return `This action returns all typeOfJob`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeOfJob`;
  }

  update(id: number, updateTypeOfJobDto: UpdateTypeOfJobDto) {
    return `This action updates a #${id} typeOfJob`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeOfJob`;
  }
}
