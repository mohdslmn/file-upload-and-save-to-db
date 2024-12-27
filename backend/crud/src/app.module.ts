// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { CatsModule } from './cats/cats.module';
// import { MongooseModule } from '@nestjs/mongoose';

// @Module({
//   imports: [MongooseModule.forRoot("mongodb+srv://mdslmn:hpIm54Cd7MG7uoHJ@nextapi.88dcl.mongodb.net/cat-record-db?retryWrites=true&w=majority&appName=NextAPI"),
//     CatsModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from './upload/upload.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://mdslmn:hpIm54Cd7MG7uoHJ@nextapi.88dcl.mongodb.net/?retryWrites=true&w=majority&appName=NextAPI'), // Replace with your MongoDB connection string
    UploadModule,
  ],
})
export class AppModule {}