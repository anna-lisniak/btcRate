const axios  = require("axios");
const GLOBAL_CONSTANTS = require("../constants");

const fetchBtcRate = async () => {
    const result = await axios.get(GLOBAL_CONSTANTS.BTC_RATE_API);

    return result.data;
}

module.exports = fetchBtcRate;