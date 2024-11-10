// import { Schema, model } from "mongoose";
// import { toJSON } from "@reis/mongoose-to-json";

// // User schema
// const userSchema = new Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phoneNumber: { type: String },
//     birthCertificateNumber: { type: String, required: true, unique: true }, // Enforces uniqueness in the database
//     profilePicture: { type: String },
//     subscriptionType: { type: String, enum: ['Free', 'Premium'], default: 'Free' },
//     paymentDetails: {
//         method: { type: String, enum: ['MobileMoney', 'Bank'], default: 'MobileMoney' },
//         transactionHistory: [{ date: Date, amount: Number }]
//     },
//     createdAt: { type: Date, default: Date.now },
//     lastLogin: { type: Date },
//     status: { type: String, enum: ['Active', 'Suspended'], default: 'Active' }
// }, {
//     timestamps: true
// });


// userSchema.plugin(toJSON);

// export const UserModel = model("User", userSchema);



