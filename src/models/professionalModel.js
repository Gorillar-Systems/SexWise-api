import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const professionalSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    profilePicture: { type: String },
    licenseNumber: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    services: { type: [String] }, // e.g., ['Therapy', 'Consultation']
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
  

  