import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { query } from 'express';

@ApiTags('CongViec')
@Controller('/api/cong-viec')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  findAll() : Promise<any>{
    return this.jobService.findAll();
  }

  @Post()
  create(@Body() createJobDto: CreateJobDto) :  Promise<string> {
    return this.jobService.create(createJobDto);
  }

  @ApiParam({ name: "id", required: true, description: "id" })
  @Get('/lay-cong-viec/:id')
  findJob(@Param('id') id: string): Promise<any> {
    return this.jobService.findOne(+id);
  }
  @ApiQuery({ name: "keyword", required: true, description: "filter by full_name" })
  @ApiQuery({ name: "size", required: true, description: "number of types in one page" })
  @ApiQuery({ name: "page", required: true, description: "page number" })
  @Get('/phan-trang-tim-kiem')
  findwidthpage(@Query("size") size, @Query("page") page, @Query("keyword") keyword): Promise<any> {

    let numPage = Number(page);
    let numSize = Number(size);
    let skip = (numPage - 1) * numSize;
    return this.jobService.findWidthPage(skip, numSize, keyword);
  }

 

  @Put('/:id')
  update(@Param('id') id: number, @Body() updateJobDto: UpdateJobDto) : Promise<string> {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) : Promise<string> {
    return this.jobService.remove(+id);
  }

  @ApiParam({name: "MaCongViec", required: true, description:"MaCongViec"})
  @Post("upload-hinh-cong-viec/:MaCongViec")
 @ApiConsumes('multipart/form-data') // Specify the media type for file upload
 @ApiBody({
   description: 'Upload a file',
   type: 'multipart/form-data',
   schema: {
     type: 'object',
     properties: {
       file: {
         type: 'string',
         format: 'binary',
       },
     },
   },
 })
 @UseInterceptors(FileInterceptor("file", {
   storage: diskStorage({
     destination: process.cwd() + "/public/img",
     filename: (req, file, callback) => {
      callback(null, new Date().getTime() + `${file.originalname}`)
    }
   })
}))
upload(@UploadedFile("file") file,@Param('MaCongViec') id: number, @Body() updateJobDto : UpdateJobDto) :Promise<string>{
    return this.jobService.upload(file.filename,+id,updateJobDto);
 }

 @Get("/lay-menu-loai-cong-viec")
 getMenu() : Promise<any>{
   return this.jobService.getMenu();
 }

 @ApiParam({name: "MaLoaiCongViec", required: true, description:"MaLoaiCongViec"})
 @Get("/lay-chi-tiet-loai-cong-viec/:MaLoaiCongViec")
 getLoaiByIdJob(@Param('MaLoaiCongViec') MaLoaiCongViec: number) : Promise<any>{
   return this.jobService.getLoaiByIdJob(+MaLoaiCongViec);
 }

 @ApiParam({name: "MaChiTietLoai", required: true, description:"MaChiTietLoaiCongViec"})
 @Get("/lay-cong-viec-theo-chi-tiet-loai/:MaChiTietLoai")
 getJobByLoai(@Param('MaChiTietLoai') MaChiTietLoai: number) : Promise<any>{
   return this.jobService.getJobByDetailLoai(+MaChiTietLoai);
 }

 @ApiParam({name: "MaCongViec", required: true, description:"MaCongViec"})
 @Get("/lay-cong-viec-chi-tiet/:MaCongViec")
 getDetailJobByIdJob(@Param('MaCongViec') MaCongViec: number) : Promise<any>{
   return this.jobService.getDetailJobByIdJob(+MaCongViec);
 }

 @ApiParam({name: "TenCongViec", required: true, description:"TenCongViec"})
 @Get("/lay-danh-sach-cong-viec-theo-ten/:TenCongViec")
 getJobByName(@Param('TenCongViec') TenCongViec: string) : Promise<any>{
   return this.jobService.getJobByName(TenCongViec);
 }
}
