import { Inject, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

const IS_DEV_MODE = true;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere without re-import
    }),  
    AuthModule
  ],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {}
