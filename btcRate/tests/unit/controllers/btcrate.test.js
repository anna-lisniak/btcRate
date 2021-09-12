const GLOBAL_CONSTANTS = require("../../../constants");
const BtcRateController = require("../../../controllers/btcRate.controller");
const BtcRateService = require("../../../services/btcRate.service");

describe("BtcRate controller", () => {
    const mockRequest = null;
    let mockResponse;
    const mockBtcResponse = { success: true };

    const btcService = new BtcRateService(GLOBAL_CONSTANTS.BTC_RATE_API);
    btcService.get = () => mockBtcResponse;

    const btcRateController = new BtcRateController(
        btcService,
        GLOBAL_CONSTANTS.CURRENCY
    );

    beforeEach(() => {
        mockResponse = {
            status: jest
                .fn()
                .mockImplementation(() => mockResponse),
            json: jest.fn()
        }
    });

    it("status code should be 200 and btc rate data should be returned", async () => {
        await btcRateController.getBtcRate(mockRequest, mockResponse);

        expect(mockResponse.status).toBeCalledTimes(1);
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledTimes(1);
        expect(mockResponse.json).toBeCalledWith({ "btcRate": mockBtcResponse });
    });
})