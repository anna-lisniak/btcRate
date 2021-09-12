const express = require('express');
const GLOBAL_CONSTANTS = require('../constants');
const router = express.Router();
const getTokenMiddleware = require('../middleware/getToken.middleware');
const AuthorizationMiddleware = require('../middleware/authorization.middleware');
const BtcRateController = require('../controllers/btcRate.controller');
const BtcRateService = require("../services/btcRate.service");

const authMiddleware = new AuthorizationMiddleware();

const btcRateController = new BtcRateController(
    new BtcRateService(GLOBAL_CONSTANTS.BTC_RATE_API),
    GLOBAL_CONSTANTS.CURRENCY
);

router.get('/', getTokenMiddleware, authMiddleware.verify, btcRateController.getBtcRate);

module.exports = router;
