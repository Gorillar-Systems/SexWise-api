import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.SMTP_PASSWORD
    },
});