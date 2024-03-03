import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupJobDetail {
    @ApiProperty()
    ten_nhom :string
    @ApiProperty()
	hinh_anh :string
    @ApiProperty()
	ma_loai_cong_viec :number
   
}
