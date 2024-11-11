import { consultationModel } from "../models/consultationModel.js";
import { bookConsultationValidator, updateConsultationDetailsValidator } from "../validators/consultation.js";
import { userModel } from "../models/userModel2.js";

export const bookConsultation = async (req, res, next) => {
  try {
    const { userId, } = req.body;

    // Validate user inputs
    const { error, value } = bookConsultationValidator.validate({
      ...req.body
    });
    if (error) {
      return res.status(422).json(error);
    }

    // Check if user exist
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new consultation
    const newConsultation = await consultationModel.create({
      ...value,
      user: req.auth.id
    });
    res.status(201).json({
      message: 'Consultation booked successfully',
      consultation: newConsultation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error)
  }
};

export const getConsultationDetails = async (req, res, next) => {
  try {
    const consultation = await consultationModel.findById(req.params.consultationId)
      .populate('userId', 'userName email');

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.status(200).json(consultation);
  } catch (error) {
    next(error)
  }
};

export const updateConsultationDetails = async (req, res, next) => {
  try {
    // Validate update data
    const { error, value } = updateConsultationDetailsValidator.validate({
      ...req.body
    });
    if (error) {
      return res.status(422).json(error);
    }

    // Update the booked consultation
    const updatedConsultation = await consultationModel.findOneAndUpdate(
      { userId: req.auth.id, _id: req.params.consultationId },
      { ...value },
      { new: true }
    );

    if (!updatedConsultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.status(200).json({
      message: 'Consultation details updated successfully',
      consultation: updatedConsultation
    });
  } catch (error) {
    next(error)
  }
};

export const getUserConsultations = async (req, res, next) => {
  try {
    const consultations = await Consultation.find({ userId: req.params.userId })
      .populate('fullName services')
      .sort({ date: -1 });

    res.status(200).json(consultations);
  } catch (error) {
    next(error)
  }
};

export const getProfessionalConsultations = async (req, res, next) => {
  try {
    const consultations = await Consultation.find({ professionalId: req.params.professionalId })
      .populate('userId', 'name')
      .sort({ date: -1 });

    res.status(200).json(consultations);
  } catch (error) {
    next(error)
  }
};

export const cancelConsultation = async (req, res, next) => {
  try {
    const consultation = await consultationModel.findById(req.params.consultationId);

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    if (consultation.userId.toString() !== req.auth.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    if (consultation.status === 'completed') {
      return res.status(400).json({ message: 'Completed consultations cannot be canceled' });
    }

    consultation.status = 'cancelled';
    await consultation.save();

    res.status(200).json({ message: 'Consultation cancelled successfully' });
  } catch (error) {
    next(error)
  }
};

export const rescheduleConsultation = async (req, res, next) => {
  try {
    const { newDate } = req.body;
    const consultation = await Consultation.findById(req.params.consultationId);

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    const userId = req.user.id;
    if (consultation.userId) {
      return res.status(200).json({ message: "Consultation rescheduled successfully" });
    }
    consultation.date = newDate;
    await consultation.save();

  } catch (error) {
    next(error)
  }
};

export const getConsultationHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userOrProfessionalId = req.user.id;
    const filter = req.user.role === 'User' ? { userId: userOrProfessionalId } : { professionalId: userOrProfessionalId };

    const consultations = await Consultation.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error)
  }
};


