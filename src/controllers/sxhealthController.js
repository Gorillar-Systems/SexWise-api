// import { SymptomModel } from "../models/symptom.js";
// import { AppointmentModel } from "../models/appointment.js";
// import { ReminderModel } from "../models/reminder.js";
// import { ResourceModel } from "../models/resource.js";

// // Schedule an appointment
// export const addAppointment = async (req, res, next) => {
//     try {
//         const { date, location, doctorName, type, notes } = req.body;
//         const userId = req.user.userId;

//         const newAppointment = new AppointmentModel({
//             user: userId,
//             date,
//             location,
//             doctorName,
//             type,
//             notes
//         });

//         await newAppointment.save();
//         res.status(201).json({ message: "Appointment scheduled successfully", appointment: newAppointment });
//     } catch (error) {
//         next(error);
//     }
// };

// // Get all appointments for a user with optional filters (e.g., status)
// export const getAppointments = async (req, res, next) => {
//     try {
//         const userId = req.user.userId;
//         const { status } = req.query;

//         const filter = { user: userId };
//         if (status) {
//             filter.status = status;
//         }

//         const appointments = await AppointmentModel.find(filter);
//         res.status(200).json(appointments);
//     } catch (error) {
//         next(error);
//     }
// };

// // Add a reminder
// export const addReminder = async (req, res, next) => {
//     try {
//         const { message, frequency, nextReminder } = req.body;
//         const userId = req.user.userId;

//         const newReminder = new ReminderModel({
//             user: userId,
//             message,
//             frequency,
//             nextReminder,
//             isActive: true
//         });

//         await newReminder.save();
//         res.status(201).json({ message: "Reminder set successfully", reminder: newReminder });
//     } catch (error) {
//         next(error);
//     }
// };

// // Get all reminders for a user
// export const getReminders = async (req, res, next) => {
//     try {
//         const userId = req.user.userId;

//         const reminders = await ReminderModel.find({ user: userId });
//         res.status(200).json(reminders);
//     } catch (error) {
//         next(error);
//     }
// };

// // Get educational resources by category
// export const getResources = async (req, res, next) => {
//     try {
//         const { category } = req.query;

//         const filter = {};
//         if (category) {
//             filter.category = category;
//         }

//         const resources = await ResourceModel.find(filter);
//         res.status(200).json(resources);
//     } catch (error) {
//         next(error);
//     }
// };

// // Get a single educational resource by ID
// export const getResourceById = async (req, res, next) => {
//     try {
//         const { id } = req.params;

//         const resource = await ResourceModel.findById(id);
//         if (!resource) {
//             return res.status(404).json({ error: "Resource not found" });
//         }

//         res.json(resource);
//     } catch (error) {
//         next(error);
//     }
// };
