const axios = require('axios');
const GLOBAL_CONSTANTS = require('../../../constants');
const BtcRate = require('../../../services/btcRate');

describe('btcRate', () => {
    describe('fetchBtcRate', () => {

        afterEach(() => jest.restoreAllMocks());

        const btc = new BtcRate(GLOBAL_CONSTANTS.BTC_RATE_API);

        it('should call btc rate mock request', async () => {
            const mockResponse = {
                data: {
                    bpi: {
                        [GLOBAL_CONSTANTS.CURRENCY]: "success"
                    }
                }
            }
            const axiosGet = jest
                .spyOn(axios, 'get')
                .mockImplementation(() => mockResponse)

            const response = await btc.get(GLOBAL_CONSTANTS.CURRENCY);

            expect(axiosGet).toBeCalledTimes(1);
            expect(axiosGet).toBeCalledWith(GLOBAL_CONSTANTS.BTC_RATE_API);
            expect(response).toEqual("success");
        })
})
