import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaClient } from '@prisma/client';
import * as moment from 'moment';

@Injectable()

export class JobService {
    getCurrentDate(): string {
        const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
        return `Current Date: ${currentDate}`;
    }
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

        const finalData = {
            content: {
                ...data
            },
            dateTime: moment().format('YYYY-MM-DD HH:mm:ss')

        };
        return finalData
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
        const finalData = {
            content: {
                skip: skip,
                pageSize: numSize,
                keywords: keyword,
                data: [
                    ...data
                ],

                dateTime: moment().format('YYYY-MM-DD HH:mm:ss')

            }
        }
        return finalData
    }

    async findOne(id: number): Promise<any> {
        let data = await this.prisma.congViec.findMany({
            where: {
                id: id
            }
        })
        const finalData = {
            content: {
                ...data
            },
            dateTime: moment().format('YYYY-MM-DD HH:mm:ss')

        };
        return finalData
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
        const finalData = {
            content: {
                ...data
            },
            dateTime: moment().format('YYYY-MM-DD HH:mm:ss')

        };
        return finalData
       
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
        
        const finalData = {
            content: {
                ...data
            },
            dateTime: moment().format('YYYY-MM-DD HH:mm:ss')

        };
        return finalData
    }

    async getJobByDetailLoai(MaChiTietLoai: number): Promise<any> {
        let table1Data = await this.prisma.congViec.findMany({
            where: {
                id: MaChiTietLoai
            }

        })

        const table2Data = await this.prisma.chiTietLoaiCongViec.findMany({
            where: { id: { in: table1Data.map(item => item.ma_chi_tiet_loai) } },
            // ... your select options
            // select:{

            //  ma_nhom:true,
            //   ten_chi_tiet:true,
            // }
        });

        const table3Data = await this.prisma.nhomCTLCV.findMany({
            where: { id: { in: table2Data.map(item => item.ma_nhom) } },
            // ... your select options
            select: {
                ma_loai_cong_viec: true,
                ten_nhom: true
            }
        });

        const table4Data = await this.prisma.loaiCongViec.findMany({
            where: { id: { in: table3Data.map(item => item.ma_loai_cong_viec) } },
            // ... your select options
            select: {
                ten_loai_cong_viec: true
            }
        });

        const table5Data = await this.prisma.nguoiDung.findMany({
            where: { id: { in: table1Data.map(item => item.nguoi_tao) } },
            // ... your select options
            select: {
                name: true,
                avatar: true,
            }
        });


        const finalData = table1Data.map(item1 => ({
            congViec: {
                ...item1
            },
            tenLoaiCongViec: table4Data[0].ten_loai_cong_viec,
            tenNhomChiTietLoai: table3Data[0].ten_nhom,
            tenChiTietLoai: table2Data[0].ten_chi_tiet,
            tenNguoiTao: table5Data[0].name,
            avatar: table5Data[0].avatar
            //Continue adding nested data from other tables
        }));


        let finalTime = { ...finalData, dateTime: moment().format('YYYY-MM-DD HH:mm:ss') };
        return finalTime
    }


    async getDetailJobByIdJob(MaCongViec: number): Promise<any> {
        let table1Data = await this.prisma.congViec.findMany({

            where: {
                id: MaCongViec
            }
        })


        const table2Data = await this.prisma.chiTietLoaiCongViec.findMany({
            where: { id: { in: table1Data.map(item => item.ma_chi_tiet_loai) } },
            // ... your select options
            // select:{

            //  ma_nhom:true,
            //   ten_chi_tiet:true,
            // }
        });

        const table3Data = await this.prisma.nhomCTLCV.findMany({
            where: { id: { in: table2Data.map(item => item.ma_nhom) } },
            // ... your select options
            select: {
                ma_loai_cong_viec: true,
                ten_nhom: true
            }
        });

        const table4Data = await this.prisma.loaiCongViec.findMany({
            where: { id: { in: table3Data.map(item => item.ma_loai_cong_viec) } },
            // ... your select options
            select: {
                ten_loai_cong_viec: true
            }
        });

        const table5Data = await this.prisma.nguoiDung.findMany({
            where: { id: { in: table1Data.map(item => item.nguoi_tao) } },
            // ... your select options
            select: {
                name: true,
                avatar: true,
            }
        });


        const finalData = table1Data.map(item1 => ({
            congViec: {
                ...item1
            },
            tenLoaiCongViec: table4Data[0].ten_loai_cong_viec,
            tenNhomChiTietLoai: table3Data[0].ten_nhom,
            tenChiTietLoai: table2Data[0].ten_chi_tiet,
            tenNguoiTao: table5Data[0].name,
            avatar: table5Data[0].avatar
            //Continue adding nested data from other tables
        }));


        let finalTime = { ...finalData, dateTime: moment().format('YYYY-MM-DD HH:mm:ss') };
        return finalTime
        
    }

    async getJobByName(TenCongViec: string): Promise<any> {
        
        const table1Data = await this.prisma.congViec.findMany({
            where: {
                ten_cong_viec: {
                    contains: TenCongViec
                },

            }
        })

        const table2Data = await this.prisma.chiTietLoaiCongViec.findMany({
            where: { id: { in: table1Data.map(item => item.ma_chi_tiet_loai) } },
            // ... your select options
            // select:{

            //  ma_nhom:true,
            //   ten_chi_tiet:true,
            // }
        });

        const table3Data = await this.prisma.nhomCTLCV.findMany({
            where: { id: { in: table2Data.map(item => item.ma_nhom) } },
            // ... your select options
            select: {
                ma_loai_cong_viec: true,
                ten_nhom: true
            }
        });

        const table4Data = await this.prisma.loaiCongViec.findMany({
            where: { id: { in: table3Data.map(item => item.ma_loai_cong_viec) } },
            // ... your select options
            select: {
                ten_loai_cong_viec: true
            }
        });

        const table5Data = await this.prisma.nguoiDung.findMany({
            where: { id: { in: table1Data.map(item => item.nguoi_tao) } },
            // ... your select options
            select: {
                name: true,
                avatar: true,
            }
        });


        const finalData = table1Data.map(item1 => ({
            congViec: {
                ...item1
            },
            tenLoaiCongViec: table4Data[0].ten_loai_cong_viec,
            tenNhomChiTietLoai: table3Data[0].ten_nhom,
            tenChiTietLoai: table2Data[0].ten_chi_tiet,
            tenNguoiTao: table5Data[0].name,
            avatar: table5Data[0].avatar
            //Continue adding nested data from other tables
        }));


        let finalTime = { ...finalData, dateTime: moment().format('YYYY-MM-DD HH:mm:ss') };
        return finalTime

    }
}