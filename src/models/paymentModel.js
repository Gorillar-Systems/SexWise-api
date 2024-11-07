// import { toJSON } from "@reis/mongoose-to-json";
// import mongoose from "mongoose";

// const paymentSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     // professionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional' },
//     amount: { type: Number, required: true },
//     method: { type: String, enum: ['MobileMoney', 'Bank'], required: true },
//     status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
//     date: { type: Date, default: Date.now }
//   }, {
//     timestamps: true
//   });
//   paymentSchema.plugin(toJSON);
  
//   module.exports = mongoose.model('Payment', paymentSchema);
  