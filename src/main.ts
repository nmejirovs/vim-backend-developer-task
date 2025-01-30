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
        logLevels: currentConfiguration.logLevels
      }),
    }
  );
  
  const config = new DocumentBuilder()
    .setTitle('User Notifications Manager')
    .setDescription('The "User Notifications Manager" service API description')
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
  SwaggerModule.setup('api/docs', app, documentFactory);
  await app.listen(currentConfiguration.port);
}
bootstrap();
