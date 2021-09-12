const express = require('express');
const GLOBAL_CONSTANTS = require('../constants');
const UserController = require('../controllers/user.controller');
const router = express.Router();
const DataBase = require('../services/db');
const JwtService = require('../services/jwt.service');
const LoggerService = require('../services/logger.service');
const UserService = require('../services/user.service');

const userController = new UserController(
    new UserService(new DataBase(GLOBAL_CONSTANTS.DB_FILE_NAME)),
    new JwtService(),
    new LoggerService(process.env.AMQP_SERVER, process.env.QUEUE),
);

router.post("/create", userController.create);

router.post("/login", userController.login);

router.get("/verify", userController.verify);

module.exports = router;
