// import { toJSON } from "@reis/mongoose-to-json";
// import mongoose from "mongoose";

// const subscriptionSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     subscriptionType: { type: String, enum: ['Monthly', 'Yearly'], default: 'Monthly' },
//     startDate: { type: Date, default: Date.now },
//     endDate: { type: Date },
//     isActive: { type: Boolean, default: true },
//     amount: { type: Number, required: true }
//   }, {
//     timestamps: true
//   });
//   subscriptionSchema.plugin(toJSON);
  
//   module.exports = mongoose.model('Subscription', subscriptionSchema);
  