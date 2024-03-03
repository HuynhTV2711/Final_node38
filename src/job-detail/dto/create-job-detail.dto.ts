import { ApiProperty } from "@nestjs/swagger";

export class CreateJobDetailDto {
    @ApiProperty()
    ten_chi_tiet: string
    @ApiProperty()
    ma_nhom :number
}
