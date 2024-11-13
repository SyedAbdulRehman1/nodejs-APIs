const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/create', userController.createUser);
router.get('/all', userController.getAllUsers);
router.get('/read', userController.getUser);
router.get('/update', userController.updateUser);
router.get('/delete', userController.deleteUser);

module.exports = router;
