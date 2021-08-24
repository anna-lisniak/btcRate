const createUserController = require("../../../../controllers/user/create.controller");
const DataBase = require("../../../../services/db");
const JwtService = require("../../../../services/jwt.service");
const UserService = require("../../../../services/user");

describe('getToken middleware', () => {
    let mockRequest;
    let mockResponse;

    const db = new DataBase("testPerson.json");
    const userService = new UserService(db);
    const tokenService = new JwtService();
    
    let createUser = new createUserController(
        userService,
        tokenService
    );

    beforeEach(() => {
        mockRequest = {
            body: {
                email: "email",
                password: "password"
            }
        };
        mockResponse = {
            status: jest
                .fn()
                .mockImplementation(() => mockResponse),
            send: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn(),
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('status code should be 404 if email is not provided', () => {
        mockRequest.body.email = "";

        createUser.create(mockRequest, mockResponse);

        expect(mockResponse.status).toBeCalledTimes(1);
        expect(mockResponse.status).toBeCalledWith(404);
        expect(mockResponse.send).toBeCalledTimes(1);
        expect(mockResponse.send).toBeCalledWith("You should provide email and password");
    });
    it('status code should be 404 if password is not provided', () => {
        mockRequest.body.password = "";

        createUser.create(mockRequest, mockResponse);

        expect(mockResponse.status).toBeCalledTimes(1);
        expect(mockResponse.status).toBeCalledWith(404);
        expect(mockResponse.send).toBeCalledTimes(1);
        expect(mockResponse.send).toBeCalledWith("You should provide email and password");
    });
    it('status code should be 404 if user is already exist', () => {
        userService.getPassword = () => true;
        createUser = new createUserController(
            userService,
            tokenService
        );

        createUser.create(mockRequest, mockResponse);

        expect(mockResponse.status).toBeCalledTimes(1);
        expect(mockResponse.status).toBeCalledWith(404);
        expect(mockResponse.send).toBeCalledTimes(1);
        expect(mockResponse.send).toBeCalledWith("User with this email already exist");
    });
    it('status code should be 500 if user was not saved', async () => {
        userService.getPassword = () => undefined;
        userService.save = () => Error;

        createUser = new createUserController(
            userService,
            tokenService
        );

        await createUser.create(mockRequest, mockResponse);

        expect(mockResponse.status).toBeCalledTimes(1);
        expect(mockResponse.status).toBeCalledWith(500);
        expect(mockResponse.send).toBeCalledTimes(1);
        expect(mockResponse.send).toBeCalledWith("Internal server error");
    });
    it('status code should be 200 and token should be returned', async () => {
        const mockToken = 'mockToken';
        userService.getPassword = () => undefined
        userService.save = () => null;
        tokenService.create = () => mockToken;

        createUser = new createUserController(
            userService,
            tokenService
        );

        await createUser.create(mockRequest, mockResponse);

        expect(mockResponse.cookie).toBeCalledTimes(1);
        expect(mockResponse.cookie).toBeCalledWith("btcToken", mockToken, { httpOnly: true });
        expect(mockResponse.status).toBeCalledTimes(1);
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledTimes(1);
        expect(mockResponse.json).toBeCalledWith({ token: mockToken });
    });
});