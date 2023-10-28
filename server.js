const express = require('express');
const path = require('path');
const app = express();

const urlDatabase = {}; // In-memory database for URL mappings

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/shorten', (req, res) => {
  const longUrl = req.body.longUrl;

  if (!isValidUrl(longUrl)) {
    res.status(400).json({ error: 'Invalid URL format' });
    return;
  }

  const shortCode = generateShortCode();
  urlDatabase[shortCode] = longUrl;
  res.json({ shortUrl: `http://localhost:3000/${shortCode}` });
});

app.get('/:shortCode', (req, res) => {
  const shortCode = req.params.shortCode;
  const longUrl = urlDatabase[shortCode];

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).render('not-found');
  }
});

function generateShortCode() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const codeLength = 6;
  let shortCode = '';
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortCode += characters.charAt(randomIndex);
  }
  return shortCode;
}

function isValidUrl(url) {
  const urlPattern = /^(http|https):\/\/[^ "]+$/;
  return urlPattern.test(url);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
