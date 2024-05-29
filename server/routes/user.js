const router = require('express').Router();

const { register } = require('../controller/user');

router.post('/register', register)

module.exports = router;