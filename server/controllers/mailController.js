const nodemailer = require("nodemailer");

// Create a transporter using Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ebisagirma41@gmail.com",
    pass: "mmslehqxrhipxsic",
  },
});

const sendEmail = async (receiverEmail, password) => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: " OmniStock Web-app 📧 <ebisagirma41@gmail.com>",
      to: `${receiverEmail}`,
      subject: "OMNISTOCK credential 🔑",
      text: `This is your password ${password} on OmniStock Web-app \n don't share your cridential with other people.`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
