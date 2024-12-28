// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from './upload/upload.module';


@Module({
  imports: [
    MongooseModule.forRoot(''), // Replace with your MongoDB connection string
    UploadModule,
  ],
})
export class AppModule {}
