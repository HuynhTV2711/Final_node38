import { Injectable } from '@nestjs/common';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HireJobService {
  prisma = new PrismaClient();

  create(createHireJobDto: CreateHireJobDto) {
    return 'This action adds a new hireJob';
  }

  async findAll() {
    let data = this.prisma.thueCongViec.findMany();
    return data;
  }

  async hireJobPagination(skip: number, numSize: number): Promise<any> {
    let data = await this.prisma.thueCongViec.findMany({
      skip: skip,
      take: numSize,
    });
    return data;
  }
  async findOne(id: number): Promise<any> {
    let data = await this.prisma.thueCongViec.findMany({
      where: {
        id: id,
      },
    });
    return data;
  }

  update(id: number, updateHireJobDto: UpdateHireJobDto) {
    return `This action updates a #${id} hireJob`;
  }

  async remove(id: number): Promise<any> {
    await this.prisma.thueCongViec.delete({
      where: {
        id: id,
      },
    });

    return `delete hire job ${id} successfull! `;
  }
}
