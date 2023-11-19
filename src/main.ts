import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT

  const config = new DocumentBuilder()
    .setTitle('IT-radar API')
    .setVersion('1.0')
    .addCookieAuth('refreshToken')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('open-api', app, document);

  app.useGlobalPipes(new ValidationPipe)
  app.useGlobalGuards();
  app.use(cookieParser());
  app.enableCors({credentials: true, origin: ["http://localhost:3000"]})
  await app.listen(PORT, ()=> {
    console.log(`Server started on PORT ${PORT}, in ${process.env.MODE} mode`)
  });
}
bootstrap();
