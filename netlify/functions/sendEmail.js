const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
  const { name, email, message } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mobfaskey@gmail.com',
      pass: 'Mobaboba112!',
    },
  });

  const mailOptions = {
    from: 'mobfaskey@gmail.com',
    to: 'aishasalimgl@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Email send error' }),
    };
  }
};