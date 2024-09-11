const { db } = require('./dbConfig');

// Fonction pour créer les tables
const createTables = () => {
  // Créer la table users (Contient les informations des utilisateurs inscrits sur la plateforme.)
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created or already exists.');
    }
  });

  // Créer la table challenges (Contient les informations des défis disponibles sur la plateforme.)
  db.run(`CREATE TABLE IF NOT EXISTS challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    points INTEGER DEFAULT 0,
    difficulty_level TEXT,
    category TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating challenges table:', err.message);
    } else {
      console.log('challenges table created or already exists.');
    }
  });

  // Créer la table games (Contient les informations des jeux disponibles sur la plateforme.)
  db.run(`CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT,
      max_players INTEGER,
      min_players INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
    if (err) {
      console.error('Error creating games table:', err.message);
    } else {
      console.log('games table created or already exists.');
    }
  });

  // Créer la table user_progress (Contient les informations de progression des utilisateurs dans les défis et les jeux.)
  db.run(`CREATE TABLE IF NOT EXISTS user_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        challenge_id INTEGER,
        game_id INTEGER,
        progress_percentage INTEGER DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (challenge_id) REFERENCES challenges(id),
        FOREIGN KEY (game_id) REFERENCES games(id)
    )`, (err) => {
    if (err) {
      console.error('Error creating user_progress table:', err.message);
    } else {
      console.log('user_progress table created or already exists.');
    }
  });

  // Créer la table statistics (Contient les statistiques des utilisateurs sur les défis et les jeux.)
  db.run(`CREATE TABLE IF NOT EXISTS statistics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        game_id INTEGER,
        challenge_id INTEGER,
        total_time_spent INTEGER,
        score INTEGER,
        attempts INTEGER DEFAULT 0,
        total_challenges_completed INTEGER DEFAULT 0,
        total_games_played INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (game_id) REFERENCES games(id),
        FOREIGN KEY (challenge_id) REFERENCES challenges(id)
    )`, (err) => {
    if (err) {
      console.error('Error creating statistics table:', err.message);
    } else {
      console.log('statistics table created or already exists.');
    }
  });

  // Créer la table friends (Contient les informations des amis des utilisateurs.)
  db.run(`CREATE TABLE IF NOT EXISTS friends (
        user_id INTEGER NOT NULL,
        friend_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (friend_id) REFERENCES users(id),
        PRIMARY KEY (user_id, friend_id)
    )`, (err) => {
    if (err) {
      console.error('Error creating friends table:', err.message);
    } else {
      console.log('friends table created or already exists.');
    }
  });

  // Créer la table messages (Contient les messages envoyés entre utilisateurs.)
  db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender_id INTEGER NOT NULL,
        receiver_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (receiver_id) REFERENCES users(id)
    )`, (err) => {
    if (err) {
      console.error('Error creating messages table:', err.message);
    } else {
      console.log('messages table created or already exists.');
    }
  });

  // Créer la table posts (Contient les publications des utilisateurs.)
  db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`, (err) => {
    if (err) {
      console.error('Error creating posts table:', err.message);
    } else {
      console.log('posts table created or already exists.');
    }
  });

  // Créer la table comments (Contient les commentaires des utilisateurs sur les publications.)
  db.run(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    )`, (err) => {
    if (err) {
      console.error('Error creating comments table:', err.message);
    } else {
      console.log('comments table created or already exists.');
    }
  });

  // Créer la table likes (Contient les likes des utilisateurs sur les publications.)
  db.run(`CREATE TABLE IF NOT EXISTS likes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER,
        comment_id INTEGER,
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id),
        FOREIGN KEY (comment_id) REFERENCES comments(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`, (err) => {
    if (err) {
      console.error('Error creating likes table:', err.message);
    } else {
      console.log('likes table created or already exists.');
    }
  });

  // Créer la table courses (Contient les cours et leçons disponibles sur la plateforme (pour la partie apprentissage).)
  db.run(`CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL, -- Titre du cours (ex: "Apprendre à coder en Python")
      description TEXT,
      category TEXT, -- Ex: programming, design, etc.
      difficulty_level TEXT, -- Ex: beginner, intermediate, advanced
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
    if (err) {
      console.error('Error creating courses table:', err.message);
    } else {
      console.log('courses table created or already exists.');
    }
  });

  // Créer la table lessons (Contient les différentes leçons liées à chaque cours)
  db.run(`CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER NOT NULL,
      title TEXT NOT NULL, -- Titre de la leçon (ex: "Introduction à la programmation")
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )`, (err) => {
    if (err) {
      console.error('Error creating lessons table:', err.message);
    } else {
      console.log('lessons table created or already exists.');
    }
  });

  // Créer la table user_courses (Contient les informations de progression des utilisateurs dans les cours et leçons.)
  db.run(`CREATE TABLE IF NOT EXISTS user_courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      lesson_id INTEGER,
      progress_percentage INTEGER DEFAULT 0, -- Pourcentage de progression dans le cours
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (course_id) REFERENCES courses(id),
      FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    )`, (err) => {
    if (err) {
      console.error('Error creating user_courses table:', err.message);
    } else {
      console.log('user_courses table created or already exists.');
    }
  });

  // Créer la table rewards (Contient les récompenses disponibles sur la plateforme.)
  db.run(`CREATE TABLE IF NOT EXISTS rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      challenge_id INTEGER,
      game_id INTEGER,
      reward_type TEXT, -- badge, points, etc.
      points_awarded INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (challenge_id) REFERENCES challenges(id),
      FOREIGN KEY (game_id) REFERENCES games(id)
    )`, (err) => {
    if (err) {
      console.error('Error creating rewards table:', err.message);
    } else {
      console.log('rewards table created or already exists.');
    }
  });

  // Créer la table events (Pour gérer les événements spéciaux comme Noël, Pâques, etc.)
  db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT, -- Description de l'événement
      start_date DATE,
      end_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
    if (err) {
      console.error('Error creating events table:', err.message);
    } else {
      console.log('events table created or already exists.');
    }
  });

  // Créer la table event_rewards (Contient les récompenses spéciales pour les événements.)
  db.run(`CREATE TABLE IF NOT EXISTS event_rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      event_id INTEGER NOT NULL,
      reward_type TEXT, -- badge, points, etc.
      points_awarded INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (event_id) REFERENCES events(id)
    )`, (err) => {
    if (err) {
      console.error('Error creating event_rewards table:', err.message);
    } else {
      console.log('event_rewards table created or already exists.');
    }
  });

  // Créer la table event_participants (Contient les participants aux événements.)
  db.run(`CREATE TABLE IF NOT EXISTS event_participants (
      user_id INTEGER NOT NULL,
      event_id INTEGER NOT NULL,
      participation_status TEXT, -- pending, accepted, declined, etc.
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (event_id) REFERENCES events(id),
      PRIMARY KEY (user_id, event_id)
    )`, (err) => {
    if (err) {
      console.error('Error creating event_participants table:', err.message);
    } else {
      console.log('event_participants table created or already exists.');
    }
  });

  // Créer la table badges (Contient les détails des badges disponibles sur la plateforme.)
  db.run(`CREATE TABLE IF NOT EXISTS badges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
    if (err) {
      console.error('Error creating badges table:', err.message);
    } else {
      console.log('badges table created or already exists.');
    }
  });

  // Créer la table user_badges (Contient les badges obtenus par les utilisateurs.)
  db.run(`CREATE TABLE IF NOT EXISTS user_badges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      badge_id INTEGER NOT NULL,
      obtained_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (badge_id) REFERENCES badges(id),
      PRIMARY KEY (user_id, badge_id) -- Un utilisateur ne peut obtenir un badge qu'une seule fois
    )`, (err) => {
    if (err) {
      console.error('Error creating user_badges table:', err.message);
    } else {
      console.log('user_badges table created or already exists.');
    }
  });

  // Créer la table notifications (Contient les notifications pour les utilisateurs.)
  db.run(`CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Identifiant unique de la notification
      user_id INTEGER NOT NULL,              -- L'utilisateur concerné par la notification
      type TEXT NOT NULL,                    -- Le type de notification (par exemple : "nouveau défi", "message", "badge", etc.)
      content TEXT NOT NULL,                 -- Le contenu de la notification (message court ou résumé)
      is_read BOOLEAN DEFAULT 0,             -- Si la notification a été lue (0 = non, 1 = oui)
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création de la notification
      FOREIGN KEY (user_id) REFERENCES users(id)  -- Clé étrangère vers la table des utilisateurs
    )`, (err) => {
    if (err) {
      console.error('Error creating notifications table:', err.message);
    } else {
      console.log('notifications table created or already exists.');
    }
  });

  // Créer la table user_settings (Contient les paramètres de configuration des utilisateurs.)
  db.run(`CREATE TABLE IF NOT EXISTS user_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Identifiant unique des paramètres
      user_id INTEGER NOT NULL,              -- L'utilisateur concerné par ces paramètres
      notifications_enabled BOOLEAN DEFAULT 1, -- Indique si les notifications sont activées (1 = oui, 0 = non)
      email_notifications BOOLEAN DEFAULT 1,   -- Indique si les notifications par e-mail sont activées
      dark_mode BOOLEAN DEFAULT 0,            -- Si l'utilisateur préfère le mode sombre (1 = activé, 0 = désactivé)
      language TEXT DEFAULT 'en',             -- Langue préférée de l'utilisateur (par défaut : anglais)
      privacy_level TEXT DEFAULT 'public',    -- Niveau de confidentialité (public, privé, amis uniquement, etc.)
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de création des paramètres
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date de dernière modification des paramètres
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`, (err) => {
    if (err) {
      console.error('Error creating user_settings table:', err.message);
    } else {
      console.log('user_settings table created or already exists.');
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
