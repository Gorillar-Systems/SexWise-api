import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { professionalModel } from "../models/professionalModel.js";
import { registerProfessionalValidator, loginProfessionalValidator, getProfessionalProfileValidator, updateProfessionalProfileValidator } from "../validators/professional.js";
import { mailTransporter } from "../utils/mail.js";
import { registerProfessionalEmailTemplate } from "../utils/templateProfessional.js";

export const registerProfessional = async (req, res, next) => {
  try {
    // Validate professional input
    const { error, value } = registerProfessionalValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }
    // Check if the professional already exists
    const Professional = await professionalModel.findOne({ email: value.email });
    if (Professional) {
      return res.status(400).json({ message: 'Professional already exists!' });
    }
    // Hash password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    // Create new professional and save into database
    const newUser = await professionalModel.create({
      ...value,
      password: hashedPassword,
    });
    const emailContent = `
    <h1>Welcome to SexWise Platform!</h1>
                <p>Thank you for registering with us. We’re glad to have you onboard.</p>
                <p>To complete your registration, please verify your email by logging in</p>`
    // Send professional a confirmation email
    await mailTransporter.sendMail({
      from: `SEXWISE <sexwise69@gmail.com>`,
      to: value.email,
      subject: "Professional Registration",
      html: registerProfessionalEmailTemplate(emailContent)

    });
    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "24h" });
    // Respond to request

    const { password, ...rest } = newUser._doc;
    const response = {
      user: rest,
      token
    }
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const loginProfessional = async (req, res, next) => {
  try {
    // Validate professional input
    const { error, value } = loginProfessionalValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    // Check if the professional exists
    const professional = await professionalModel.findOne({ email: value.email });
    if (!professional) {
      return res.status(401).json({ message: "Professional not found!" });
    }

    // Verify password
    const correctPassword = await bcrypt.compareSync(value.password, professional.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Generate token
    const token = jwt.sign(
      { id: professional._id },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "24h" });
    // Respond to request
    res.json({
      message: "Logged in succesfully!",
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ erro: "An error occured!" });
    next(error);
  }
};

export const getProfessionalProfile = async (req, res, next) => {
  try {
    // Validate incoming data
    const { error } = getProfessionalProfileValidator.validate(req.query);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }
    // Find authenticated professional
    const professional = await professionalModel.findById(req.auth.id).select("-password");
    if (!professional) {
      return res.status(404).json({ message: "Professional not found!" });
    }
    res.json(professional);
  } catch (error) {
    next(error);
  }
};

export const getAllProfessionals = async (req, res, next) => {
  try {
    const { service } = req.query;
    const filter = service ? { services: service } : {};

    const professionals = await professionalModel.find(filter);
    res.status(200).json(professionals);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error)
  }
};

export const updateProfessionalProfile = async (req, res, next) => {
  try {
    // Validate professional input
    const { error, value } = updateProfessionalProfileValidator.validate({
      ...req.body,
      profilePicture: req.file?.filename,
    });

    // if there is password in the request body hash it
    if (value?.password) {
      value.password = bcrypt.hashSync(value.password, 10);
    }

    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }
    // Update professional profile
    await professionalModel.findByIdAndUpdate(req.auth.id, value);
    // Respond to request
    res.json("Professional profile updated!");
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error)
  }
};

export const updateProfessionalStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const professional = await professionalModel.findById(req.params.id);
    if (!professional) {
      return res.status(404).json({ message: 'Professional not found' });
    }

    professional.status = status;
    await professional.save();

    res.status(200).json({ message: 'Status updated successfully', professional });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error)
  }
};

export const searchProfessionalsByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const professionals = await professionalModel.find({ name: new RegExp(name, 'i') });

    res.status(200).json(professionals);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error)
  }
};

