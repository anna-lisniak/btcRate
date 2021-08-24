const express = require('express');
const GLOBAL_CONSTANTS = require('../constants');
const router = express.Router();
const getBtcRate = require('../controllers/btcRate');
const getTokenMiddleware = require('../middleware/getToken.middleware');
const AuthorizationMiddleware = require('../middleware/authorization.middleware');
const DataBase = require('../services/db');
const JwtService = require('../services/jwt.service');
const UserService = require('../services/user');

const db = new DataBase(GLOBAL_CONSTANTS.DB_FILE_NAME);
const userService = new UserService(db);

const auth = new AuthorizationMiddleware(
    new JwtService(),
    userService.getPassword
    )

router.get('/', getTokenMiddleware, auth.verify, getBtcRate);

module.exports = router;
