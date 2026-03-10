const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// Verify connection on startup
transporter.verify((err) => {
  if (err) console.error('❌ Mail transporter error:', err.message);
  else     console.log('✅ Mail transporter ready');
});

module.exports = transporter;
