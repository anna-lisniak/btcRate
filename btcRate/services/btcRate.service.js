const axios  = require("axios");
const GLOBAL_CONSTANTS = require("../constants");

class BtcRate {
    constructor(api) {
        this.api = api;
    }
    async get(currency) {
        const {data: {bpi}} = await axios.get(GLOBAL_CONSTANTS.BTC_RATE_API);

        return bpi[currency];
    }

}

module.exports = BtcRate;