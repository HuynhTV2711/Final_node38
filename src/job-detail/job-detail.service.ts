import { Injectable } from '@nestjs/common';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { UpdateJobDetailDto } from './dto/update-job-detail.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobDetailService {
  prisma = new PrismaClient()
  create(createJobDetailDto: CreateJobDetailDto) {
    return 'This action adds a new jobDetail';
  }

  async findAll() {
    let data = await this.prisma.nhomCTLCV.findMany({
      include: {
        ChiTietLoaiCongViec:true
      }
    });
  
      return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobDetail`;
  }

  update(id: number, updateJobDetailDto: UpdateJobDetailDto) {
    return `This action updates a #${id} jobDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobDetail`;
  }
}
