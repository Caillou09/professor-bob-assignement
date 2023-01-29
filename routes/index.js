const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.post('/users', controllers.createUser);

router.get('/users', controllers.getAllUsers);

router.delete('/users/:userId', controllers.deleteUser);

module.exports = router;