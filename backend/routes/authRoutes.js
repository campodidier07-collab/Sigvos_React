const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { proteger } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', proteger, getMe);

module.exports = router;
