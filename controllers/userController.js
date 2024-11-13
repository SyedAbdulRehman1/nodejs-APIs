const User = require('../models/userModel');

exports.createUser = (req, res) => {
  const { name, email, password } = req.query;
  if (!name || !email || !password) {
    return res.status(400).send('Please provide name, email, and password');
  }

  User.create({ name, email, password }, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('User already exists');
      }
      return res.status(500).send('Database error');
    }
    res.send('User created successfully');
  });
};

exports.getAllUsers = (req, res) => {
  User.findAll((err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
};

exports.getUser = (req, res) => {
  const { email } = req.query;
  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(results);
  });
};

exports.updateUser = (req, res) => {
  const { name, email } = req.query;
  User.update(name, email, (err, result) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.send('User updated successfully');
  });
};

exports.deleteUser = (req, res) => {
  const { email } = req.query;
  User.delete(email, (err, result) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.send('User deleted successfully');
  });
};
