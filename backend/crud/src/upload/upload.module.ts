// src/upload/upload.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { VehicleSchema } from './Schemas/vehicle.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}