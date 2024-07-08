import nodemailer from "nodemailer";
import Admin from "@/app/models/Admin";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, adminId }: any) => {
  try {
    if (!adminId) {
      throw new Error("Admin ID is required");
    }
    const hashedToken = await bcryptjs.hash(adminId.toString(), 10);

    if (emailType === "VERIFY") {
      await Admin.findByIdAndUpdate(adminId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await Admin.findByIdAndUpdate(adminId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_TRANSPORT_USERNAME,
        pass: process.env.MAIL_TRANSPORT_PASSWORD,
      },
    });

    const mailOptions = {
      from: "hitesh@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
