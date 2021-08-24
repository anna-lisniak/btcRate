const express = require('express');
const router = express.Router();
const getBtcRate = require('../controlers/btcRate');
const getTokenMiddleware = require('../middleware/getToken.middleware');
const { verifyAccess } = require('../middleware/verifyAccess');

router.get('/', getTokenMiddleware, verifyAccess, getBtcRate);

module.exports = router;
