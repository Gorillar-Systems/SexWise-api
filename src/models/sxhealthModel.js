import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

// Symptom tracking schema
const symptomSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, required: true }, // e.g., "pain", "discharge", "irregular periods"
    intensity: { type: Number, min: 1, max: 10 }, // Scale 1-10
    notes: { type: String },
}, {
    timestamps: true
});
symptomSchema.plugin(toJSON);

// Appointment schema
const appointmentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    doctorName: { type: String },
    type: { type: String, required: true }, // e.g., "STD Testing", "Consultation"
    status: { type: String, enum: ["scheduled", "completed", "canceled"], default: "scheduled" },
    notes: { type: String }
}, {
    timestamps: true
});
appointmentSchema.plugin(toJSON);

// Reminder schema
const reminderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    frequency: { type: String, enum: ["daily", "weekly", "monthly"], required: true },
    nextReminder: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});
reminderSchema.plugin(toJSON);

// Educational resource schema
const resourceSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ["STD", "contraception", "menstrual health", "general health", "mental health"], required: true },
    tags: [String],
    sourceUrl: { type: String }
}, {
    timestamps: true
});
resourceSchema.plugin(toJSON);

export const SymptomModel = model("Symptom", symptomSchema);
export const AppointmentModel = model("Appointment", appointmentSchema);
export const ReminderModel = model("Reminder", reminderSchema);
export const ResourceModel = model("Resource", resourceSchema);
