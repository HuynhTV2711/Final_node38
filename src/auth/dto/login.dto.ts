import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class loginDTO {
  @ApiProperty({ type: String, description: 'Email', required: true })
  @IsEmail()
  email: string;
  @ApiProperty({ type: String, description: 'Password', required: true })
  @IsNotEmpty()
  pass_word: string;
}
