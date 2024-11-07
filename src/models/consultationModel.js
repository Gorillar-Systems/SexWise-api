import { toJSON } from "@reis/mongoose-to-json";
// import mongoose from "mongoose";
import { Schema, model, Types } from "mongoose";

const consultationSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    professionalId: { type: Types.ObjectId, ref: 'Professional' },
    consultationType: { type: String, enum: ['one-time', 'subscription'], required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'Pending' },
    // paymentStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    amount: { type: Number, required: true },
    sessionDetails: {
      audioRecording: { type: Boolean, default: false },
      chatEnabled: { type: Boolean, default: true },
      callEnabled: { type: Boolean, default: true }
    },
  }, {
    timestamps: true
  });
  consultationSchema.plugin(toJSON);
  
  export const consultationModel = model('Consultation', consultationSchema);
  