const express = require('express');
const router = express.Router();
const createUser = require('../controlers/user/create');
const login = require('../controlers/user/login');

router.post('/create', createUser)

router.post("/login", login)

module.exports = router;