import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: false, description: '邮箱' })
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, description: '手机号' })
  @IsNumber()
  phoneNum?: number;
}
