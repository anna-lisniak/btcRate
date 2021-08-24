const express = require('express');
<<<<<<< HEAD
const router = express.Router();
const getBtcRate = require('../controlers/btcRate');
const { getToken } = require('../middleware/getToken');
const { verifyAccess } = require('../middleware/verifyAccess');

router.get('/', getToken, verifyAccess, getBtcRate);

module.exports = router;
=======
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
>>>>>>> 070aeee1702ab40143c03a81444617f4a73706c9
