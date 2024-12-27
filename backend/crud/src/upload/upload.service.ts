// // src/upload/upload.service.ts
// import { Injectable, BadRequestException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as csv from 'csv-parser';
// import * as xlsx from 'xlsx';
// import { Readable } from 'stream';

// @Injectable()
// export class UploadService {
//   constructor(@InjectModel('Vehicle') private readonly vehicleModel: Model<any>) {}

//   async processFile(file: Express.Multer.File): Promise<string> {
//     const fileExtension = file.originalname.split('.').pop().toLowerCase();
//     let data: any[];

//     if (fileExtension === 'csv') {
//       data = await this.processCsv(file.buffer);
//     } else if (fileExtension === 'xlsx') {
//       data = await this.processExcel(file.buffer);
//     } else {
//       throw new BadRequestException('Invalid file format. Only CSV and Excel files are allowed.');
//     }

//     if (!this.validateHeaders(data[0])) {
//       throw new BadRequestException('Required headers "account_code" and "vehicle_chasis_no" are missing.');
//     }

//     await this.saveToDatabase(data);
//     return 'File processed and data saved successfully.';
//   }

//   private async processCsv(buffer: Buffer): Promise<any[]> {
//     return new Promise((resolve, reject) => {
//       const results = [];
//       Readable.from(buffer)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => resolve(results))
//         .on('error', (error) => reject(error));
//     });
//   }

//   private async processExcel(buffer: Buffer): Promise<any[]> {
//     const workbook = xlsx.read(buffer, { type: 'buffer' });
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     return xlsx.utils.sheet_to_json(sheet);
//   }

//   private validateHeaders(firstRow: any): boolean {
//     return 'account_code' in firstRow && 'vehicle_chasis_no' in firstRow;
//   }

//   private async saveToDatabase(data: any[]): Promise<void> {
//     await this.vehicleModel.insertMany(data);
//   }
// }

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as csv from 'csv-parser';
import * as xlsx from 'xlsx';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  constructor(@InjectModel('Vehicle') private readonly vehicleModel: Model<any>) {}

  async processFile(file: Express.Multer.File): Promise<string> {
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    let data: any[];

    if (fileExtension === 'csv') {
      data = await this.processCsv(file.buffer);
    } else if (fileExtension === 'xlsx') {
      data = await this.processExcel(file.buffer);
    } else {
      throw new BadRequestException('Invalid file format. Only CSV and Excel files are allowed.');
    }

    if (!this.validateHeaders(data[0])) {
      throw new BadRequestException('Required headers "account_code" and "vehicle_chassis_number" are missing.');
    }

    await this.saveToDatabase(data);
    return 'File processed and data saved successfully.';
  }

  private async processCsv(buffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results = [];
      Readable.from(buffer)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  private async processExcel(buffer: Buffer): Promise<any[]> {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
  }

  private validateHeaders(firstRow: any): boolean {
    return 'account_code' in firstRow && 'vehicle_chassis_number' in firstRow;
  }

  private async saveToDatabase(data: any[]): Promise<void> {
    const formattedData = data.map(item => ({
      account_code: item.account_code,
      vehicle_chasis_no: item.vehicle_chassis_number,
      // Add other fields as needed
    }));
    await this.vehicleModel.insertMany(formattedData);
  }
}

