import { Injectable } from '@nestjs/common';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { UpdateJobDetailDto } from './dto/update-job-detail.dto';
import { PrismaClient } from '@prisma/client';
import { CreateGroupJobDetail } from './dto/creat-group-job.dto';
import { UpdateGroupJobDetailDto } from './dto/update-group-job.dto';
import * as moment from 'moment';

@Injectable()
export class JobDetailService {
  prisma = new PrismaClient()
  

  async findAll() {
    let data = await this.prisma.nhomCTLCV.findMany({
      include: {
        ChiTietLoaiCongViec:true
      }
    });
  
    const finalData = {
      content: {
          ...data
      },
      dateTime: moment().format('YYYY-MM-DD HH:mm:ss')

  };
  return finalData
  }

  async create(createJobDetailDto: CreateJobDetailDto) :Promise<string> {
    let newDetail= { ...createJobDetailDto };
    await this.prisma.chiTietLoaiCongViec.create({
      data: newDetail
    })
    return `Create New Detail Type Of Job Successful`
  }

  async findWidthPage (skip: number, numSize: number, keyword: string): Promise<any> {
    // sequelize -> offset, limit
    // prisma -> take skip
    let data = await this.prisma.nhomCTLCV.findMany({
      where: {
        ten_nhom: {
          contains: keyword
        }
      },
      skip: skip,
      take: numSize,
      include: {
        ChiTietLoaiCongViec: true
      }
    });

    const finalData = {
      content: {
          ...data
      },
      dateTime: moment().format('YYYY-MM-DD HH:mm:ss')

  };
  return finalData
  }

 async findOne(id: number) : Promise<any>{
  let data = await this.prisma.nhomCTLCV.findMany({
    where: {
      id: id
    },
    include:{
      ChiTietLoaiCongViec:true
    }
  });

   const finalData = {
      content: {
          ...data
      },
      dateTime: moment().format('YYYY-MM-DD HH:mm:ss')

  };
  return finalData
  }

 async update(id: number, updateJobDetailDto: UpdateJobDetailDto) : Promise<string> {
    let updateDetail = { ...updateJobDetailDto};
    await this.prisma.chiTietLoaiCongViec.update({
      where: {
        id: id
      },
      data: updateDetail
    });
    return `update id:${id} Detail type of job success !`
  }

  async remove(id: number) : Promise<string> {
    await this.prisma.chiTietLoaiCongViec.delete({
      where: {
        id: id
      }
    });
    return `delete Loại Chi Tiết ${id} Công Việc suscessfull! `;
  }

  async createGroup(createGroupJobDetail: CreateGroupJobDetail) :Promise<string> {
    let newGroup= { ...createGroupJobDetail };
    await this.prisma.nhomCTLCV.create({
      data: newGroup
    })
    return `Create New Group Of Detail Type Of Job Successful`
  }

  async upload(filename: string ,id: number,updateGroupJobDetailDto: UpdateGroupJobDetailDto) : Promise<string> {
    let upload = { ...updateGroupJobDetailDto};
    upload.hinh_anh = filename;
    await this.prisma.nhomCTLCV.update({
      where: {
        id: id
      },
      data: upload
      // data: {
      //   // hinh_anh: filename
      //   // add other properties to update as needed
      // },
    });
    return `Upload Image Group Of Detail Job id:${id} success !`
  }

  async updateGroup(id: number, updateGroupJobDetailDto: UpdateGroupJobDetailDto) : Promise<string> {
    let updateGroup = { ...updateGroupJobDetailDto};
    await this.prisma.nhomCTLCV.update({
      where: {
        id: id
      },
      data: updateGroup
    });
    return `update Group Of Detail Job id:${id} success !`
  }
}
