const {Router} = require('express');

const router = Router();
const AuthController = require('../controllers/AuthController');
router.post('/auth',AuthController.auth);
router.get('/public',AuthController.public);
router.get('/private',AuthController.private);

module.exports = router;