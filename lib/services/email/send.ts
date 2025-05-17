import nodemailer from 'nodemailer';

const sendEmail: Function = async (reciever: string, subject: string, content: string) => {
  const { NODE_MAILER_EMAIL, NODE_MAILER_PASSWORD, NODE_MAILER_SENDER } = process.env;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: NODE_MAILER_EMAIL,
      pass: NODE_MAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: NODE_MAILER_SENDER,
    to: reciever,
    subject,
    html: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent successfully to: ${reciever}`);
    }
  });
};

export default sendEmail;
