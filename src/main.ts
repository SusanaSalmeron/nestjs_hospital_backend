import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
/* import fs from 'fs';
import path from 'path';
import loki from 'lokijs'; */


/* global.db = new loki('hospital.db'); */

/* function loadData() {
  const tables = ['users', 'patients', 'doctors', 'clinicalRecords', 'appointments', 'diseases', 'contactUs']
  tables.forEach(tableName => {
    const rawdata = fs.readFileSync(path.resolve(__dirname, 'data', `${tableName}.json`));
    let data = JSON.parse(rawdata);
    if (tableName == 'diseases') {
      data = data.map(d => {
        return {
          name: d
        }
      })
    }
    const table = db.addCollection(tableName);
    table.insert(data)
  })
}  */


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
    cors: true,
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  const config = new DocumentBuilder()
    .setTitle('Hospital Backend')
    .setDescription('Hospital Management Api')
    .setVersion('1.0')
    .addTag('Hospital')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
