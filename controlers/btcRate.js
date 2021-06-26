const axios  = require("axios");

const getBtcRate = async () => {
    const result = await axios.get("https://api.coindesk.com/v1/bpi/currentprice/UAH.json");

    return result.data;
}

module.exports = getBtcRate