let getPassword = require("../../../services/user/getPassword");
const AuthorizationMiddleware = require("../../../middleware/verifyAccess");

describe('Authrorization middleware', () => {
    let mockRequest = {};
    let mockResponse = {
        sendStatus: jest.fn()
    };
    let nextFunction = jest.fn();

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should access to be true and run nextFunction', () => {
        const auth = new AuthorizationMiddleware(
            { verify: () => ({ error: null, data: {} }) },
            () => true
        );
        auth.verify(mockRequest, mockResponse, nextFunction)

        expect(nextFunction).toBeCalledTimes(1);
    });
    it('should access to be false and status code to be 403', () => {
        const auth = new AuthorizationMiddleware(
            { verify: () => ({ error: null, data: {} }) },
            () => false
        );
        auth.verify(mockRequest, mockResponse, nextFunction)

        expect(nextFunction).toBeCalledTimes(0);
        expect(mockResponse.sendStatus).toBeCalledTimes(1);
        expect(mockResponse.sendStatus).toBeCalledWith(403);
    });
});