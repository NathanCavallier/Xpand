const { db } = require('./dbConfig');

// Fonction pour créer les tables
const createTables = () => {
  // Create Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    profilePic TEXT
  )`, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created or already exists.');
    }
  });

  // Créer la table Challenges
  db.run(`CREATE TABLE IF NOT EXISTS challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    points INTEGER
  )`, (err) => {
    if (err) {
      console.error('Error creating challenges table:', err.message);
    } else {
      console.log('Challenges table created or already exists.');
    }
  });

  // Créer la table UserChallenges
    db.run(`CREATE TABLE IF NOT EXISTS userChallenges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        challengeId INTEGER,
        completed BOOLEAN,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(challengeId) REFERENCES challenges(id)
    )`, (err) => {
        if (err) {
        console.error('Error creating userChallenges table:', err.message);
        } else {
        console.log('UserChallenges table created or already exists.');
        }
    });

    // Créer la table UserScores
    db.run(`CREATE TABLE IF NOT EXISTS userScores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        score INTEGER,
        FOREIGN KEY(userId) REFERENCES users(id)
    )`, (err) => {
        if (err) {
        console.error('Error creating userScores table:', err.message);
        } else {
        console.log('UserScores table created or already exists.');
        }
    });

    // Créer la table Badges (les badges)
    db.run(`CREATE TABLE IF NOT EXISTS badges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        points INTEGER
    )`, (err) => {
        if (err) {
        console.error('Error creating badges table:', err.message);
        } else {
        console.log('Badges table created or already exists.');
        }
    });

    // Créer la table UserBadges (les badges des utilisateurs)
    db.run(`CREATE TABLE IF NOT EXISTS userBadges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        badgeId INTEGER,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(badgeId) REFERENCES badges(id)
    )`, (err) => {
        if (err) {
        console.error('Error creating userBadges table:', err.message);
        } else {
        console.log('UserBadges table created or already exists.');
        }
    });
};

// Fonction pour lister les tables
const listTables = () => {
  db.all(`SELECT name FROM sqlite_master WHERE type='table'`, [], (err, tables) => {
    if (err) {
      console.error('Error listing tables:', err.message);
    } else {
      console.log('Tables in the database:', tables);
    }
  });
};

module.exports = { createTables, listTables };
