import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // define cơ bản của 1 swagger
  const config = new DocumentBuilder()
    .setTitle('Đồ án cuối khóa')
    .setDescription('Đây là list API về fiverr')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  // apply swagger cho NestJs
  const swagger = SwaggerModule.createDocument(app, config);
  // setup swagger với đường dẫn là api
  SwaggerModule.setup('api', app, swagger);
  await app.listen(3000);
}
bootstrap();
