import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  // TODO: Ensure Nest app in src/main.ts calls app.useGlobalPipes with ValidationPipe configured with whitelist/forbidNonWhitelisted/transform all true, and import ValidationPipe from @nestjs/common without changing other bootstrap logic.
  
  const app = await NestFactory.create(AppModule);
    // Enable CORS
    app.enableCors({
      origin: 'http://localhost:3001',
      credentials: true,
    });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
