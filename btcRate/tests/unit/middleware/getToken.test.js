const getTokenMiddleware = require("../../../middleware/getToken.middleware");

describe('getToken middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;

    const mockToken = "mockToken";
    const mockBearerToken = `Bearer ${mockToken}`;

    beforeEach(() => {
        mockRequest = {
            cookies: {},
            headers: {}
        };
        mockResponse = {
            sendStatus: jest.fn()
        };
        nextFunction = jest.fn();
    });

    it('status code should be 403 if it`s called without headers', async () => {
        getTokenMiddleware(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.sendStatus).toBeCalledTimes(1);
        expect(mockResponse.sendStatus).toBeCalledWith(403);
    });
    
    it('status code should be 401 if there is no bearer token in headers', async () => {
        mockRequest.headers = {
            authorization: mockToken
        };

        getTokenMiddleware(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.sendStatus).toBeCalledTimes(1);
        expect(mockResponse.sendStatus).toBeCalledWith(401);
    });

    it('should post token from cookies to the request', async () => {
        mockRequest.cookies = {
            btcToken: mockToken
        };

        getTokenMiddleware(mockRequest, mockResponse, nextFunction);

        expect(nextFunction).toBeCalledTimes(1);
        expect(mockRequest.token).toEqual(mockToken);
    });

    it('should post token from bearerToken to the request', async () => {
        mockRequest.headers = {
            authorization: mockBearerToken
        };

        getTokenMiddleware(mockRequest, mockResponse, nextFunction);

        expect(nextFunction).toBeCalledTimes(1);
        expect(mockRequest.token).toEqual(mockToken);
    });

   
});