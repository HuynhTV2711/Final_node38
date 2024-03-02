import { ApiProperty } from "@nestjs/swagger"
import { IsISO8601 } from "class-validator"

export class CreateCommentDto {
  @ApiProperty()
  ma_cong_viec: number
  @ApiProperty()
  ma_nguoi_binh_luan: number
  @ApiProperty()
  @IsISO8601({ strict: true })
  ngay_binh_luan: string; // YYYY-MM-DDTHH:mm:ss.sssZ chuẩn iso8061
  @ApiProperty()
  noi_dung: string
  @ApiProperty()
  sao_binh_luan: number

}



