import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ example: 'sample@gmail.com', description: 'email for login' })
  @IsEmail()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email: string;
  
  @ApiProperty({ example: 'StrongPassword123!', description: 'Password for login' })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}