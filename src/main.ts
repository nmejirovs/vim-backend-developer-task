import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from './config/configuration';

const currentConfiguration = configuration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      logger: new ConsoleLogger({
        json: true,
        colors: true,
        timestamp: true,
        logLevels: currentConfiguration.logLevels
      }),
    }
  );
  
  const config = new DocumentBuilder()
    .setTitle('vim-backend-developer-task')
    .setDescription('The vim-backend-developer-task API description')
    .setVersion('1.0')
    .addBearerAuth(
      { 
        type: 'http',
        bearerFormat: 'Bearer',
        in: 'Header',
        name: 'Authorization',
        scheme: 'Bearer'
      },
      'Bearer'
    )
    .addSecurityRequirements({
      Bearer: ['read', 'write']
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(currentConfiguration.port);
}
bootstrap();
