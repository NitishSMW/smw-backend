 // server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const pythonApi = require('./pythonApi');
const { exec } = require('child_process');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Register Route
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  
  db.query(query, [username, password, email], (err, result) => {
    if (err) return res.json({ success: false, message: 'Registration failed' });
    res.json({ success: true, message: 'Registration successful' });
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
  db.query(query, [username, password], (err, result) => {
    if (err) return res.json({ success: false, message: 'Login failed' });
    if (result.length === 0) return res.json({ success: false, message: 'Invalid credentials' });
    res.json({ success: true, message: 'Login successful' });
  });
});

// Serve Exam Questions Route
app.get('/questions', (req, res) => {
  const query = 'SELECT * FROM questions';
  db.query(query, (err, result) => {
    if (err) return res.json({ success: false, message: 'Failed to retrieve questions' });
    res.json(result);
  });
});

// Submit Exam Answers Route (calls Python for analytics)
app.post('/submit', (req, res) => {
  const { answers } = req.body;
  
  // Call Python script to process answers
  pythonApi.processAnswers(answers, (result) => {
    res.json(result);
  });
});

// Handle PHP API Calls (e.g., email-related tasks)
app.get('/send-email', (req, res) => {
  exec('php server/phpApi.php', (err, stdout, stderr) => {
    if (err) {
      return res.json({ success: false, message: 'Error sending email' });
    }
    res.json({ success: true, message: 'Email sent successfully' });
  });
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

