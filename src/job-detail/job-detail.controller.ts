import { Controller, Get, Post, Body, Param, Delete, Query, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { JobDetailService } from './job-detail.service';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { UpdateJobDetailDto } from './dto/update-job-detail.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateGroupJobDetailDto } from './dto/update-group-job.dto';
import { CreateGroupJobDetail } from './dto/creat-group-job.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage} from 'multer';
@ApiTags('ChiTietLoaiCongViec')
@Controller('/api/chi-tiet-loai-cong-viec')
export class JobDetailController {
  constructor(private readonly jobDetailService: JobDetailService) { }


  @Get()
  findAll(): Promise<any> {
    return this.jobDetailService.findAll();
  }

  @Post()
  create(@Body() createJobDetailDto: CreateJobDetailDto) :Promise<string> {
    return this.jobDetailService.create(createJobDetailDto);
  }


  @ApiQuery({ name: "keyword", required: true, description: "filter by full_name" })
  @ApiQuery({ name: "size", required: true, description: "number of types in one page" })
  @ApiQuery({ name: "page", required: true, description: "page number" })
  @Get('/phan-trang-tim-kiem')
  findwidthpage(@Query("size") size, @Query("page") page, @Query("keyword") keyword): Promise<any> {

    let numPage = Number(page);
    let numSize = Number(size);
    let skip = (numPage - 1) * numSize;
    return this.jobDetailService.findWidthPage(skip, numSize, keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.jobDetailService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateJobDetailDto: UpdateJobDetailDto): Promise<string> {
    return this.jobDetailService.update(+id, updateJobDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<string>{
    return this.jobDetailService.remove(+id);
  }

  @Post("/them-nhom-chi-tiet-loai")
  createGroup(@Body() createGroupJobDetail: CreateGroupJobDetail) : Promise<string>{
    return this.jobDetailService.createGroup(createGroupJobDetail);
  }

  // @ApiParam({name: "MaNhomLoaiCongViec", required: true, description:"MaNhomLoaiCongViec"})
  // @Post("/upload-hinh-nhom-loai-cong-viec/:MaNhomLoaiCongViec}")
  // @UseInterceptors(FileInterceptor("file", {
  //   storage: diskStorage({
  //     destination: process.cwd() + "/public/img",
  //     filename: (req, file, callback) => {
  //       callback(null, new Date().getTime() + `${file.originalname}`)
  //     }
  //   })
  // }))
  // upload(@UploadedFile("file") file) {
  //   return file;
  // }

  @ApiParam({name: "id", required: true, description:"id"})
   @Put("/sua-nhom-chi-tiet-loai/:id")
   updateGroup(@Param('id') id: string, @Body() updateGroupJobDetailDto : UpdateGroupJobDetailDto) {
    return this.jobDetailService.updateGroup(+id,updateGroupJobDetailDto);
   }

}
