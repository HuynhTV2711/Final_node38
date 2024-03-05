import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobService {
  prisma = new PrismaClient()

  async create(createJobDto: CreateJobDto): Promise<string> {
    let newJob = { ...createJobDto };
    await this.prisma.congViec.create({
      data: newJob
    })
    return `Create Job Successful`
  }

  async findAll(): Promise<any> {
    let data = await this.prisma.congViec.findMany({
    });

    return data;
  }


  async findWidthPage(skip: number, numSize: number, keyword: string): Promise<any> {
    // sequelize -> offset, limit
    // prisma -> take skip
    let data = await this.prisma.congViec.findMany({
      where: {
        ten_cong_viec: {
          contains: keyword
        }
      },
      skip: skip,
      take: numSize,

    });
    return data;
  }

  async findOne(id: number): Promise<any> {
    let data = await this.prisma.congViec.findMany({
      where: {
        id: id
      }
    })
    return data
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<string> {
    let updateJob = { ...updateJobDto };
    await this.prisma.congViec.update({
      where: {
        id: id
      },
      data: updateJob
    });
    return `update job id:${id} success !`
  }

  async remove(id: number): Promise<string> {
    await this.prisma.congViec.delete({
      where: {
        id: id
      }
    });
    return `delete Công Việc :${id} suscessfull! `;
  }

  async upload(filename: string, id: number, updateJobDto: UpdateJobDto): Promise<string> {
    let upload = { ...updateJobDto };
    upload.hinh_anh = filename;
    await this.prisma.congViec.update({
      where: {
        id: id
      },
      data: upload

    });
    return `Upload Image Job id:${id} success !`
  }


  async getMenu(): Promise<any> {
    let data = await this.prisma.nhomCTLCV.findMany({
      include: {
        ChiTietLoaiCongViec: true
      }
    })
    return data
  }

  async getLoaiByIdJob(MaLoaiCongViec: number): Promise<any> {
    let data = await this.prisma.loaiCongViec.findMany({
      where: {
        id: MaLoaiCongViec
      },
      include: {
        NhomCTLCV: {
          include: {
            ChiTietLoaiCongViec: true
          }
        },
      },
    })
    return data
  }

  async getJobByLoai(MaChiTietLoai: number): Promise<any> {
    let data = await this.prisma.congViec.findMany({
      where: {
        id: MaChiTietLoai
      }
     
    })
    return data
  }


  async getDetailJobByIdJob(MaCongViec: number): Promise<any> {
    let data = await this.prisma.congViec.findMany({
    
      where:{
        id: MaCongViec
      }
    })
  
    return data 
  }

  async getJobByName(TenCongViec:string) : Promise<any> {
    let data = await this.prisma.congViec.findMany({
      where:{
        ten_cong_viec:{
          contains: TenCongViec
        }
      }
    })
  
    return data 

  }
}
