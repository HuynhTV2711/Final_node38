import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { TypeOfJobModule } from './type-of-job/type-of-job.module';
import { JobDetailModule } from './job-detail/job-detail.module';
import { HireJobModule } from './hire-job/hire-job.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [AuthModule, CommentModule, JobDetailModule, JobModule, TypeOfJobModule, UserModule, HireJobModule, ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
