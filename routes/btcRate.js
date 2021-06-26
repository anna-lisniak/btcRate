const express = require('express');
const getBtcRate = require('../controlers/btcRate');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { findUser } = require('../controlers/user/utils');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (err, authData) => {
    if (err || !findUser(authData.email)) return res.sendStatus(403);

    const { bpi: { UAH: btcRate } } = await getBtcRate();

    res.status(200).json({ btcRate })
  })
});



module.exports = router;
