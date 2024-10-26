import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix, { exclude: ['/'] });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Chat App API')
    .setDescription('The chat app API v1 description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true });

  const port = process.env.PORT || 5000;
  await app.listen(port);

  Logger.log(`🚀 Server is running on : ${process.env.BASE_URL}`);
}

bootstrap();
