const express = require('express');
const GLOBAL_CONSTANTS = require('../constants');
const UserController = require('../controllers/user.controller');
const router = express.Router();
const DataBase = require('../services/db');
const JwtService = require('../services/jwt.service');
const UserService = require('../services/user.service');

const userController = new UserController(
    new UserService(new DataBase(GLOBAL_CONSTANTS.DB_FILE_NAME)),
    new JwtService()
);

router.post('/create', userController.create);

router.post("/login", userController.login)

module.exports = router;
