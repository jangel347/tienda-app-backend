const {Router} = require('express');

const router = Router();
const UserController = require('../controllers/UserController');
router.post('/insert',UserController.insert);

module.exports = router;