import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { SkillModule } from './skill/skill.module';
import { TypeOfJobModule } from './type-of-job/type-of-job.module';
import { JobDetailModule } from './job-detail/job-detail.module';
import { HireJobModule } from './hire-job/hire-job.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CommentModule, AuthModule, UserModule, JobModule, SkillModule, TypeOfJobModule, JobDetailModule, HireJobModule,ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
