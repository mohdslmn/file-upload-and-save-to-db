// src/schemas/vehicle.schema.ts
import * as mongoose from 'mongoose';

export const VehicleSchema = new mongoose.Schema({
  account_code: String,
  vehicle_chasis_no: String,
  // Add other fields as needed
});