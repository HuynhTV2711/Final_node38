import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { TypeOfJobService } from './type-of-job.service';
import { CreateTypeOfJobDto } from './dto/create-type-of-job.dto';
import { UpdateTypeOfJobDto } from './dto/update-type-of-job.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';


@ApiTags('LoaiCongViec')
@Controller('/api/loai-cong-viec')
export class TypeOfJobController {
  constructor(private readonly typeOfJobService: TypeOfJobService) {}

 
  @Get()
  findAll() : Promise<any> {
    return this.typeOfJobService.findAll();
  }

  @Post()
  create(@Body() createTypeOfJobDto: CreateTypeOfJobDto) : Promise<string> {
    return this.typeOfJobService.create(createTypeOfJobDto);
  }

  @ApiQuery({name: "keyword", required: true, description:"filter by full_name"})
  @ApiQuery({name: "size", required: true, description: "number of types in one page"})
  @ApiQuery({name: "page", required: true, description: "page number"})
  @Get('/phan-trang-tim-kiem')
  findwidthpage(@Query("size") size ,@Query("page") page , @Query("keyword") keyword) : Promise<any> {
    
    let numPage = Number(page);
    let numSize = Number(size);
    let skip = (numPage - 1) * numSize;
    return this.typeOfJobService.findWidthPage(skip, numSize, keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise<string> {
    return this.typeOfJobService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTypeOfJobDto: UpdateTypeOfJobDto) : Promise<string> {
    return this.typeOfJobService.update(+id, updateTypeOfJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) : Promise<string>{
    return this.typeOfJobService.remove(+id);
  }
}
