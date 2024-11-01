import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

// User schema
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    sex: { type: String, enum: ["male", "female"], required: true },
    country: { type: String, required: true },
    symptoms: [{ type: Schema.Types.ObjectId, ref: "Symptom" }],
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    reminders: [{ type: Schema.Types.ObjectId, ref: "Reminder" }],
}, {
    timestamps: true
});
userSchema.plugin(toJSON);

export const UserModel = model("User", userSchema);