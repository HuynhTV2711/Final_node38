import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, description: 'Email', required: true })
  email: string;
  @ApiProperty({ type: String, description: 'Name', required: true })
  name: string;
  @ApiProperty({ type: String, description: 'Password', required: true })
  pass_word: string;
  @ApiProperty({ type: String, description: 'Phone', required: true })
  phone: string;
  @ApiProperty({ type: String, description: 'Birth day', required: true })
  birth_day: string;
  @ApiProperty({ type: String, description: 'Gender', required: true })
  gender: string;
  @ApiProperty({ type: String, description: 'Skill', required: true })
  skill: string;
  @ApiProperty({ type: String, description: 'Certification', required: true })
  certification: string;
  @ApiProperty({ type: String, description: 'Avatar', required: true })
  avatar: string;
}
