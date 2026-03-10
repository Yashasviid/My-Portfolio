require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const mongoose   = require('mongoose');
const rateLimit  = require('express-rate-limit');

const contactRoutes = require('./routes/contact');
const cvRoutes      = require('./routes/cv');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Rate limit contact form: max 5 submissions per 15 min per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many messages sent. Please wait a bit.' },
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/cv',      cvRoutes);

app.get('/', (req, res) => res.json({ status: 'Yashasvi Portfolio API is running 🚀' }));

// ── MongoDB + Start Server ────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
