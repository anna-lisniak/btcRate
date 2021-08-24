const fetchBtcRate = require("../services/btcRate");
const GLOBAL_CONSTANTS = require('../constants');

const getBtcRate = async (_, res) => {
    const { bpi } = await fetchBtcRate();
    const btcRate = bpi[GLOBAL_CONSTANTS.CURRENCY];

    res.status(200).json({ btcRate })
}

module.exports = getBtcRate;