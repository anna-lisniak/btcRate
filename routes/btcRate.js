const express = require('express');
const GLOBAL_CONSTANTS = require('../constants');
const router = express.Router();
const getTokenMiddleware = require('../middleware/getToken.middleware');
const AuthorizationMiddleware = require('../middleware/authorization.middleware');
const DataBase = require('../services/db');
const JwtService = require('../services/jwt.service');
const UserService = require('../services/user.service');
const BtcRateController = require('../controllers/btcRate.controller');
const BtcRate = require("../services/btcRate");

const db = new DataBase(GLOBAL_CONSTANTS.DB_FILE_NAME);
const userService = new UserService(db);

const auth = new AuthorizationMiddleware(
    new JwtService(),
    userService.getPassword
);

const btcRateController = new BtcRateController(
    new BtcRate(GLOBAL_CONSTANTS.BTC_RATE_API),
    GLOBAL_CONSTANTS.CURRENCY
);

router.get('/', getTokenMiddleware, auth.verify, btcRateController.getBtcRate);

module.exports = router;
