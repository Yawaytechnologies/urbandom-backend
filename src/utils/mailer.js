import nodemailer from "nodemailer";
import { emailVerificationTemplate, welcomeEmailTemplate } from "../utils/templates.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // your Gmail app password
  },
});

export const sendVerificationEmail = async (email, username, verificationLink) => {
  const mailOptions = {
    from: `"Real Estate Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Email Verification - Real Estate Platform",
    html: welcomeEmailTemplate(username),
  };

  await transporter.sendMail(mailOptions);
};

export const testSend = async () => {
  try {
    await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: "kanakavg@gmail.com", // Change to your own email for testing
      subject: "Test Mail",
      html: "<h1>This is a test</h1>",
    });
    console.log("✅ Test email sent");
  } catch (err) {
    console.error("❌ Error sending test email:", err);
  }
};
