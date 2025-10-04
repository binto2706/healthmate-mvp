const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: path.join(__dirname, 'uploads/') });

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });
  const token = jwt.sign({ email }, 'dev-secret', { expiresIn: '7d' });
  res.json({ token });
});

app.post('/api/prescriptions/upload', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const file = req.file;
  const parsedText = `Demo parsed prescription content from ${file.originalname}`;
  const drugs = [{ name: 'Paracetamol', dose: '500mg', note: 'Pain/fever' }];
  res.json({ parsedText, drugs });
});

app.get('/api/ping', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));