const express = require('express');
const router = express.Router();
const createUser = require('../controllers/user/create');
const login = require('../controllers/user/login');

router.post('/create', createUser)

router.post("/login", login)

module.exports = router;
