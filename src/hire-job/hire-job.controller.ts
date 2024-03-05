import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('ThueCongViec')
@Controller('/api/thue-cong-viec')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}

  @ApiBody({ type: CreateHireJobDto })
  @Post('/create-hire-job')
  create(@Body() createHireJobDto: CreateHireJobDto): Promise<any> {
    return this.hireJobService.create(createHireJobDto);
  }

  @ApiBody({ type: UpdateHireJobDto })
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Put('/update-hire-job/:id')
  update(@Body() body: UpdateHireJobDto, @Param('id') id: string) {
    return this.hireJobService.update(body, +id);
  }

  @Get()
  findAll() {
    return this.hireJobService.findAll();
  }

  @ApiParam({ name: 'page', required: true, description: 'page number' })
  @ApiParam({ name: 'size', required: true, description: 'page size' })
  @Get('/:page/:size')
  hireJobPagination(@Param('page') page, @Param('size') size): Promise<any> {
    let numPage = page * 1;
    let numSize = size * 1;
    let skip = (numPage - 1) * size;
    return this.hireJobService.hireJobPagination(skip, numSize);
  }

  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hireJobService.findOne(+id);
  }

  @ApiParam({ name: 'id', required: true, description: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hireJobService.remove(+id);
  }
}
