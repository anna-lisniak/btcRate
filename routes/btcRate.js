const express = require('express');
const GLOBAL_CONSTANTS = require('../constants');
const router = express.Router();
const getBtcRate = require('../controllers/btcRate');
const getTokenMiddleware = require('../middleware/getToken.middleware');
const AuthorizationMiddleware = require('../middleware/authorization.middleware');
const DataBase = require('../services/db');
const JwtService = require('../services/jwt.service');
const getUserPassword = require('../services/user/getPassword');

const db = new DataBase(GLOBAL_CONSTANTS.DB_FILE_NAME);

const auth = new AuthorizationMiddleware(
    new JwtService(),
    (email) => getUserPassword(db, email)
    )

router.get('/', getTokenMiddleware, auth.verify, getBtcRate);

module.exports = router;
