import { Injectable } from '@nestjs/common';
import { CreateTypeOfJobDto } from './dto/create-type-of-job.dto';
import { UpdateTypeOfJobDto } from './dto/update-type-of-job.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TypeOfJobService {
  prisma = new PrismaClient()
  

 
  async findAll(): Promise<any> {
    let data = await this.prisma.loaiCongViec.findMany({
    });

    return data;
  }

  async create(createTypeOfJobDto: CreateTypeOfJobDto): Promise<string> {
    let newType = { ...createTypeOfJobDto };
    await this.prisma.loaiCongViec.create({
      data: newType
    })
    return `Create New Type Of Job Successful`
  }

  async findWidthPage (skip: number, numSize: number, keyword: string): Promise<any> {
    // sequelize -> offset, limit
    // prisma -> take skip
    let data = await this.prisma.loaiCongViec.findMany({
      where: {
        ten_loai_cong_viec: {
          contains: keyword
        }
      },
      skip: skip,
      take: numSize,
      include: {
        NhomCTLCV: true
      }
    });
    return data;
  }

  async findOne(id: number): Promise<any> {
    let data = await this.prisma.loaiCongViec.findMany({

      where: {
        id: id
      }
    });
    return data;
  }

  async update(id: number, updateTypeOfJobDto: UpdateTypeOfJobDto): Promise<string> {
    let updateType = { ...updateTypeOfJobDto};
    await this.prisma.loaiCongViec.update({
      where: {
        id: id
      },
      data: updateType
    });
    return `update id:${id} type of job success !`
  }

  async remove(id: number): Promise<any> {
    await this.prisma.loaiCongViec.delete({
      where: {
        id: id
      }
    });

    return `delete Loại ${id} Công Việc suscessfull! `;
  }
}
