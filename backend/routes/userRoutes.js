const express = require('express');
const router = express.Router();
const { db } = require('../config/dbConfig');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get all users
router.get('/', authMiddleware, (req, res) => {
  db.all('SELECT * FROM users', [], (err, users) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ users });
    }
  });
});

// Route to get a user by ID
router.get('/:id', authMiddleware, (req, res) => {
  const userId = req.params.id;
  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

// Route to create a new user
router.post('/', (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation (you should add more robust validation)
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if username or email already exists
  db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, existingUser) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (existingUser) {
      res.status(400).json({ error: 'Username or email already exists' });
    } else {
      // Hash the password (you should use a strong hashing algorithm)
      const hashedPassword = password; // Replace with actual hashing

      // Insert the new user into the database
      db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ message: 'User created', userId: this.lastID });
        }
      });
    }
  });
});