import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    sex: { type: String, required: true, enum: ["male", "female"] },
    profilePicture: { type: String },
    subscriptionType: { type: String, enum: ["One-time", "Premium"], default: "One-time"},
    role: { type: String, default: 'client', enum: ["client", "admin"] }
    // paymentDetails: { type: String, enum: ["MobileMoney", "BankAccount"], default: "MobileMoney" },
    // transactionHistory: [{ date: Date, amount: Number }]
}, {
    timestamps: true
});

userSchema.plugin(toJSON);

export const userModel = model("user", userSchema);
