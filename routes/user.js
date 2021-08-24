const express = require('express');
const GLOBAL_CONSTANTS = require('../constants');
const router = express.Router();
const createUserController = require('../controllers/user/create.controller');
const login = require('../controllers/user/login');
const DataBase = require('../services/db');
const JwtService = require('../services/jwt.service');
const UserService = require('../services/user');

const createUser = new createUserController(
    new UserService(new DataBase(GLOBAL_CONSTANTS.DB_FILE_NAME)),
    new JwtService()
);

router.post('/create', createUser.create);

router.post("/login", login)

module.exports = router;
