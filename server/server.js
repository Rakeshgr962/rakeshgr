const express = require('express');
const cors = require('cors');

const app = express();

// Allow only your Netlify frontend
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://rakeshgr18.vercel.app/';

app.use(express.json());

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
  })
);

// Health check
app.get('/', (req, res) => {
  res.json({ activeStatus: true, error: false });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields required' });
    }

    console.log('New contact message:', { name, email, subject, message });

    // Place any email / DB logic here if you add it later

    return res.json({ success: true });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = app;



