const express  = require('express');
const router   = express.Router();
const Message  = require('../models/Message');
const transporter = require('../utils/mailer');
const { ownerNotification, visitorAutoReply } = require('../utils/emailTemplates');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // ── Basic validation ──────────────────────────────────────────────────────
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' });
  }
  if (message.trim().length < 10) {
    return res.status(400).json({ success: false, error: 'Message too short (min 10 chars).' });
  }

  try {
    // ── Save to MongoDB ───────────────────────────────────────────────────
    const saved = await Message.create({ name: name.trim(), email: email.trim().toLowerCase(), message: message.trim() });

    // ── Send emails (parallel) ────────────────────────────────────────────
    const notif = ownerNotification({ name, email, message });
    const reply = visitorAutoReply({ name });

    await Promise.all([
      transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to:   process.env.NOTIFY_EMAIL,
        subject: notif.subject,
        html:    notif.html,
      }),
      transporter.sendMail({
        from: `"Yashasvi Dixit" <${process.env.EMAIL_USER}>`,
        to:   email,
        subject: reply.subject,
        html:    reply.html,
      }),
    ]);

    return res.status(201).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon 🚀",
    });

  } catch (err) {
    console.error('Contact route error:', err);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try emailing directly.',
    });
  }
});

module.exports = router;