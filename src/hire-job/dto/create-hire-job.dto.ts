import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber } from 'class-validator';

export class CreateHireJobDto {
  @ApiProperty({ type: Number, description: 'Mã công việc', required: true })
  @IsNumber()
  ma_cong_viec: number;
  @ApiProperty({ type: Number, description: 'Mã người thuê', required: true })
  @IsNumber()
  ma_nguoi_thue: number;
  @ApiProperty({ type: String, description: 'Ngày thuê', required: true })
  @IsISO8601({ strict: true })
  ngay_thue: string;
  @ApiProperty({ type: Boolean, description: 'Hoàn thành', required: true })
  hoan_thanh: boolean;
}
