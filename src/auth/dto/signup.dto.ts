import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ type: String, description: 'Email', required: true })
  @IsEmail()
  email: string;
  @ApiProperty({ type: String, description: 'Name', required: true })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ type: String, description: 'Password', required: true })
  @IsNotEmpty()
  pass_word: string;
  @ApiProperty({ type: String, description: 'Role', required: true })
  @IsNotEmpty()
  role: string;
  @ApiProperty({ type: String, description: 'Phone', required: true })
  @IsNotEmpty()
  phone: string;
  @ApiProperty({ type: String, description: 'Birth day', required: true })
  @IsDate()
  birth_day: string;
  @ApiProperty({ type: String, description: 'Gender', required: true })
  @IsNotEmpty()
  gender: string;
  @ApiProperty({ type: String, description: 'Skill', required: true })
  @IsNotEmpty()
  skill: string;
  @ApiProperty({ type: String, description: 'Certification', required: true })
  @IsNotEmpty()
  certification: string;
  @ApiProperty({ type: String, description: 'Avatar', required: true })
  avatar: string;
}
