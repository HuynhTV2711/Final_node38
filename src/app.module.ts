import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { ServeStaticModule } from '@nestjs/serve-static';
import { inForMiddleware } from './middleware/infor.middlware';
import { HireJobController } from './hire-job/hire-job.controller';

@Module({
  imports: [
    AuthModule,
    CommentModule,
    JobDetailModule,
    JobModule,
    TypeOfJobModule,
    UserModule,
    HireJobModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: '.', // /public/img/tenhinh.jpg
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Cách 1 function middleware
    // consumer.apply(loggerMiddleware).forRoutes(UserController);
    // consumer.apply(loggerMiddleware).exclude('user/:id');
    // cách 2: class middleware
    consumer.apply(inForMiddleware).forRoutes(HireJobController);
  }
}
