import nodemailer from "nodemailer";
import { NODEMAILER_HOST, NODEMAILER_PASS, NODEMAILER_PORT, NODEMAILER_USER } from "../constants/index.js";

const sendMail = (mailId, name, sponserid, transactionPassword, password) => {
  const recipient = mailId;



  const transporter = nodemailer.createTransport({
    host: NODEMAILER_HOST,
    port: NODEMAILER_PORT,
    secure: false,
    requireTLS: true,
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS,
    }
});

  const mailOptions = {
    from: `VOULTIZO GROUP <${NODEMAILER_USER}>`,
    to: `${recipient}`,
    subject: `Hi ${name}, Registration successful.`,
    text: `Hi ${name}, Welcome to VOULTIZO`,
    html: `<h4>Congrats! You have joined the VOULTIZO Group.</h4><p>Your sponserID is <strong>${sponserid}</strong><br/>name: ${recipient}<br />Transaction Password: ${transactionPassword}<br />Password: ${password}</p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email has been sent:-", info.response);
    }
  });
};

export default sendMail;
