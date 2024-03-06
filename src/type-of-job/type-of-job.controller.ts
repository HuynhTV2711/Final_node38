import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { TypeOfJobService } from './type-of-job.service';
import { CreateTypeOfJobDto } from './dto/create-type-of-job.dto';
import { UpdateTypeOfJobDto } from './dto/update-type-of-job.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuards } from 'src/strategy/role.stratey';


@ApiTags('LoaiCongViec')
@Controller('/api/loai-cong-viec')
export class TypeOfJobController {
  constructor(private readonly typeOfJobService: TypeOfJobService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt")) 
  @Get()
  findAll() : Promise<any> {
    return this.typeOfJobService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"),RoleGuards) 
  @Post()
  create(@Body() createTypeOfJobDto: CreateTypeOfJobDto) : Promise<string> {
    return this.typeOfJobService.create(createTypeOfJobDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt")) 
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt")) 
  @Get(':id')
  findOne(@Param('id') id: string) : Promise<string> {
    return this.typeOfJobService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"),RoleGuards) 
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTypeOfJobDto: UpdateTypeOfJobDto) : Promise<string> {
    return this.typeOfJobService.update(+id, updateTypeOfJobDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"),RoleGuards) 
  @Delete(':id')
  remove(@Param('id') id: string) : Promise<string>{
    return this.typeOfJobService.remove(+id);
  }
}
