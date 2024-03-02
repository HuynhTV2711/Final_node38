import { ApiProperty } from '@nestjs/swagger';

export default class loginDTO {
  @ApiProperty({ type: String, description: 'Email', required: true })
  email: string;
  @ApiProperty({ type: String, description: 'Password', required: true })
  pass_word: string;
}
