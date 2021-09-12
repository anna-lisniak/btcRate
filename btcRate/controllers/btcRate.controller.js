class BtcRateController {
    constructor(btcService, currency) {
        this.btcService = btcService;
        this.currency = currency;
    }

    getBtcRate = async (_, res) => {
        const btcRate = await this.btcService.get(this.currency);
        res.status(200).json({ btcRate })
    }
}

module.exports = BtcRateController;
