const db = require('../config/db');

const User = {
  create: (user, callback) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [user.name, user.email, user.password], callback);
  },

  findAll: (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, callback);
  },

  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
  },

  update: (name, email, callback) => {
    const query = 'UPDATE users SET name = ? WHERE email = ?';
    db.query(query, [name, email], callback);
  },

  delete: (email, callback) => {
    const query = 'DELETE FROM users WHERE email = ?';
    db.query(query, [email], callback);
  }
};

module.exports = User;
