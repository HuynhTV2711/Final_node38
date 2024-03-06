import { Injectable } from '@nestjs/common';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HireJobService {
  prisma = new PrismaClient();

  async create(createHireJobDto: CreateHireJobDto): Promise<string> {
    let newData = { ...createHireJobDto };
    await this.prisma.thueCongViec.create({
      data: newData,
    });
    return 'Create hire job successfully!';
  }

  async update(body: UpdateHireJobDto, id: number): Promise<string> {
    let updateHireJob = { ...body };
    await this.prisma.thueCongViec.update({
      where: {
        id: id,
      },
      data: updateHireJob,
    });

    return `Update hire job ${id} successfully! `;
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

  async remove(id: number): Promise<string> {
    await this.prisma.thueCongViec.delete({
      where: {
        id: id,
      },
    });

    return `delete hire job ${id} successfully! `;
  }
  async hoanThanhCongViec(ma_thue_cong_viec: number): Promise<string> {
    let newData = { hoan_thanh: true };
    await this.prisma.thueCongViec.update({
      where: {
        id: ma_thue_cong_viec,
      },
      data: newData,
    });

    return `Job ${ma_thue_cong_viec} successfully`;
  }
}
