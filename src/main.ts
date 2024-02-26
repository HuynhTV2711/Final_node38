import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // define cơ bản của 1 swagger
   const config = new DocumentBuilder()
   .setTitle("Đồ án cuối khóa")
   .setDescription("Đây là list API về fiverr")
   .setVersion("1.0")
   .build()
 
   // apply swagger cho NestJs
   const swagger = SwaggerModule.createDocument(app, config);
   // setup swagger với đường dẫn là api
   const swaggerApi = SwaggerModule.setup("api", app, swagger)
  await app.listen(3000);
}
bootstrap();
