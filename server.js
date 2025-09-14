require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// config
const CV_FILENAME = 'Gerald Nika - CV (Europass).pdf';
const CV_PATH = path.join(__dirname, 'cv', CV_FILENAME);
const API_KEY = process.env.API_KEY || '';
const TEMPLATE_DIR = path.join(__dirname, 'templates');

if (!fs.existsSync(CV_PATH)) {
  console.error('ERROR: CV file not found at', CV_PATH);
  process.exit(1);
}

// load templates
const subjectTemplate = fs.readFileSync(path.join(TEMPLATE_DIR, 'subject.txt'), 'utf-8');
const emailTextTemplate = fs.readFileSync(path.join(TEMPLATE_DIR, 'email.txt'), 'utf-8');
const emailHtmlTemplate = fs.readFileSync(path.join(TEMPLATE_DIR, 'email.html'), 'utf-8');
const vars = JSON.parse(fs.readFileSync(path.join(TEMPLATE_DIR, 'vars.json'), 'utf-8'));

// transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: (process.env.SMTP_SECURE === 'true'),
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

// POST /send
app.post('/send', async (req, res) => {
  try {
    if (API_KEY) {
      const key = req.get('x-api-key') || '';
      if (key !== API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Missing name or email' });

    const replaceVars = (template) =>
      template.replace(/\{\{name\}\}/g, name)
              .replace(/\{\{phone\}\}/g, vars.phone)
              .replace(/\{\{portfolio\}\}/g, vars.portfolio)
              .replace(/\{\{github\}\}/g, vars.github);

    const mailOptions = {
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: email,
      subject: replaceVars(subjectTemplate),
      text: replaceVars(emailTextTemplate),
      html: replaceVars(emailHtmlTemplate),
      attachments: [{ filename: CV_FILENAME, path: CV_PATH }]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Sent to ${email} (${name}) — id:`, info.messageId);
    return res.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('Send error', err);
    return res.status(500).json({ error: err.message || 'send failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
