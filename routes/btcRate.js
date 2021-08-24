const express = require('express');
const router = express.Router();
const getBtcRate = require('../controlers/btcRate');
const { getToken } = require('../middleware/getToken');
const { verifyAccess } = require('../middleware/verifyAccess');

router.get('/', getToken, verifyAccess, getBtcRate);

module.exports = router;