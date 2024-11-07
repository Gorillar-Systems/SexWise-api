import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "SexWise@gmail.com",
        pass: process.env.SMTP_PASSWORD
    },
    from: "SexWise@gmail.com",
});