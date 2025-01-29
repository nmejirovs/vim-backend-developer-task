import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      logger: new ConsoleLogger({
        json: true,
        colors: true,
      }),
    }
  );
  const config = new DocumentBuilder()
    .setTitle('vim-backend-developer-task')
    .setDescription('The vim-backend-developer-task API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
