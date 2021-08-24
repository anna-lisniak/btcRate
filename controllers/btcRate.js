const BtcRate = require("../services/btcRate");
const GLOBAL_CONSTANTS = require('../constants');

const getBtcRate = async (_, res) => {
    const btc = new BtcRate(GLOBAL_CONSTANTS.BTC_RATE_API);
    const btcRate = await btc.get(GLOBAL_CONSTANTS.CURRENCY);

    res.status(200).json({ btcRate })
}

module.exports = getBtcRate;
