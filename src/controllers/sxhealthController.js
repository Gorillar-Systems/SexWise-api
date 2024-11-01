// import { TodoModel } from "../models/todo.js";
// import { addTodovalidator } from "../validators/todo.js";

// export const addTodo = async (req, res, next) => {
//     try {
//         // Validate user inputs
//         const { error, value } = addTodovalidator.validate({
//             ...req.body,
//             icon: req.file?.filename
//         });
//         if (error) {
//             return res.status(422).json(error);
//         }

//         // Write todo to database
//         await TodoModel.create(value);
//         // Respond to request
//         res.status(201).json("Todo was added!");
//     } catch (error) {
//         next(error);
//     }
// }

// export const getTodos = async (req, res, next) => {
//     try {
//         const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
//         // Fetch todos from database
//         const todos = await TodoModel
//             .find(JSON.parse(filter))
//             .sort(JSON.parse(sort))
//             .limit(limit)
//             .skip(skip);
//         // Return response
//         res.status(200).json(todos);
//     } catch (error) {
//         next(error);
//     }
// }

// export const countTodos = async (req, res, next) => {
//     try {
//         const { filter = "{}" } = req.query;
//         // Count todos in database
//         const count = await TodoModel.countDocuments(JSON.parse(filter));
//         // Respond to request
//         res.json({ count });
//     } catch (error) {
//         next(error);
//     }
// }

// export const getTodo = async (req, res, next) => {
//     try {
//         const { } = req.params;
//         // Get todo by id from database
//         const todo = await TodoModel.findById(id);
//         // Respond to request
//         res.json(todo);
//     } catch (error) {
//         next(error);
//     }
// }

// export const updateTodo = (req, res, next) => {
//     res.json("Todo updated!");
// }

// export const deleteTodo = (req, res, next) => {
//     res.json("Todo deleted!");
// }


import { SymptomModel } from "../models/symptom.js";
import { AppointmentModel } from "../models/appointment.js";
import { ReminderModel } from "../models/reminder.js";
import { ResourceModel } from "../models/resource.js";

// Add a new symptom
export const addSymptom = async (req, res, next) => {
    try {
        const { type, intensity, notes } = req.body;
        const userId = req.user.userId;

        const newSymptom = new SymptomModel({
            user: userId,
            type,
            intensity,
            notes
        });

        await newSymptom.save();
        res.status(201).json({ message: "Symptom recorded successfully", symptom: newSymptom });
    } catch (error) {
        next(error);
    }
};

// Get all symptoms for a user with optional filters (e.g., date range)
export const getSymptoms = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { startDate, endDate } = req.query;

        const filter = { user: userId };
        if (startDate && endDate) {
            filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const symptoms = await SymptomModel.find(filter);
        res.status(200).json(symptoms);
    } catch (error) {
        next(error);
    }
};

// Schedule an appointment
export const addAppointment = async (req, res, next) => {
    try {
        const { date, location, doctorName, type, notes } = req.body;
        const userId = req.user.userId;

        const newAppointment = new AppointmentModel({
            user: userId,
            date,
            location,
            doctorName,
            type,
            notes
        });

        await newAppointment.save();
        res.status(201).json({ message: "Appointment scheduled successfully", appointment: newAppointment });
    } catch (error) {
        next(error);
    }
};

// Get all appointments for a user with optional filters (e.g., status)
export const getAppointments = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { status } = req.query;

        const filter = { user: userId };
        if (status) {
            filter.status = status;
        }

        const appointments = await AppointmentModel.find(filter);
        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

// Add a reminder
export const addReminder = async (req, res, next) => {
    try {
        const { message, frequency, nextReminder } = req.body;
        const userId = req.user.userId;

        const newReminder = new ReminderModel({
            user: userId,
            message,
            frequency,
            nextReminder,
            isActive: true
        });

        await newReminder.save();
        res.status(201).json({ message: "Reminder set successfully", reminder: newReminder });
    } catch (error) {
        next(error);
    }
};

// Get all reminders for a user
export const getReminders = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const reminders = await ReminderModel.find({ user: userId });
        res.status(200).json(reminders);
    } catch (error) {
        next(error);
    }
};

// Get educational resources by category
export const getResources = async (req, res, next) => {
    try {
        const { category } = req.query;

        const filter = {};
        if (category) {
            filter.category = category;
        }

        const resources = await ResourceModel.find(filter);
        res.status(200).json(resources);
    } catch (error) {
        next(error);
    }
};

// Get a single educational resource by ID
export const getResourceById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const resource = await ResourceModel.findById(id);
        if (!resource) {
            return res.status(404).json({ error: "Resource not found" });
        }

        res.json(resource);
    } catch (error) {
        next(error);
    }
};
