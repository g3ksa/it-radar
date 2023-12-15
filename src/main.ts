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
  app.enableCors({ credentials: true, origin: ["http://localhost:3000"] });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true
  });
  await app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}, in ${process.env.MODE} mode`)
  });
}
bootstrap();
