<<<<<<< HEAD
const fetchBtcRate = require("../services/btcRate");
const GLOBAL_CONSTANTS = require('../constants');

const getBtcRate = async (_, res) => {
    const { bpi } = await fetchBtcRate();
    const btcRate = bpi[GLOBAL_CONSTANTS.CURRENCY];

    res.status(200).json({ btcRate })
}

module.exports = getBtcRate;
=======
const axios  = require("axios");

const getBtcRate = async () => {
    const result = await axios.get("https://api.coindesk.com/v1/bpi/currentprice/UAH.json");

    return result.data;
}

module.exports = getBtcRate
>>>>>>> 070aeee1702ab40143c03a81444617f4a73706c9
