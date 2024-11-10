import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const professionalSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  sex: { type: String, required: true, enum: ["male", "female"] },
  dateOfBirth: { type: Date },
  profilePicture: { type: String },
  licenseNumber: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  services: [{ type: String, enum: ["consultation", 'therapy'] }], // e.g., ['Therapy', 'Consultation']
  role: {type: String, default: 'professional', enum: ["professional", "admin"] }
  // earnings: { type: Number, default: 0 },
  // paymentDetails: {
  //   bankAccount: { type: String },
  //   mobileMoney: { type: String }
}, {
  timestamps: true
});
professionalSchema.plugin(toJSON);

export const professionalModel = model("Professional", professionalSchema);


