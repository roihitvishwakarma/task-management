import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of User' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;
  
  @ApiProperty({ example: 'sample@gmail.com', description: 'Unique Email' })
  @IsEmail()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'User password' })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}