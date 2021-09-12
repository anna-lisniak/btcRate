const UserController = require("../../../controllers/user.controller");
const DataBase = require("../../../services/db");
const JwtService = require("../../../services/jwt.service");
const UserService = require("../../../services/user.service");

describe('User controller', () => {
    let mockRequest;
    let mockResponse;

    const email = "email@example.com";
    const password = "password";
    const mockToken = "mockToken";

    const db = new DataBase("testPerson.json");
    const userService = new UserService(db);
    const tokenService = new JwtService();

    const resetData = () => {
        mockRequest = {
            body: {
                email,
                password
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
    }
    describe('login', () => {
        beforeEach(resetData);

        it('status code should be 404 if email is not found', () => {
            userService.getPassword = () => undefined;
            let userController = new UserController(
                userService,
                tokenService
            );

            userController.login(mockRequest, mockResponse);

            expect(mockResponse.status).toBeCalledTimes(1);
            expect(mockResponse.status).toBeCalledWith(404);
            expect(mockResponse.send).toBeCalledTimes(1);
            expect(mockResponse.send).toBeCalledWith("User with this email is not found");
        });
        it('status code should be 400 if password is invalid', () => {
            userService.getPassword = () => "anotherPassword";
            let userController = new UserController(
                userService,
                tokenService
            );

            userController.login(mockRequest, mockResponse);

            expect(mockResponse.status).toBeCalledTimes(1);
            expect(mockResponse.status).toBeCalledWith(400);
            expect(mockResponse.send).toBeCalledTimes(1);
            expect(mockResponse.send).toBeCalledWith("Invalid password");
        });
        it('status code should be 200 if password is valid and token should be returned', () => {
            userService.getPassword = () => password;
            tokenService.create = () => mockToken;
            let userController = new UserController(
                userService,
                tokenService
            );

            userController.login(mockRequest, mockResponse);

            expect(mockResponse.status).toBeCalledTimes(1);
            expect(mockResponse.status).toBeCalledWith(200);
            expect(mockResponse.json).toBeCalledTimes(1);
            expect(mockResponse.json).toBeCalledWith({ token: mockToken });
        });
    })

    describe('create', () => {
        beforeEach(resetData);
        it('status code should be 404 if email is not provided', () => {
            mockRequest.body.email = "";
            const userController = new UserController(
                userService,
                tokenService
            );

            userController.create(mockRequest, mockResponse);

            expect(mockResponse.status).toBeCalledTimes(1);
            expect(mockResponse.status).toBeCalledWith(404);
            expect(mockResponse.send).toBeCalledTimes(1);
            expect(mockResponse.send).toBeCalledWith("You should provide email and password");
        });
        it('status code should be 404 if password is not provided', () => {
            mockRequest.body.password = "";
            const userController = new UserController(
                userService,
                tokenService
            );

            userController.create(mockRequest, mockResponse);

            expect(mockResponse.status).toBeCalledTimes(1);
            expect(mockResponse.status).toBeCalledWith(404);
            expect(mockResponse.send).toBeCalledTimes(1);
            expect(mockResponse.send).toBeCalledWith("You should provide email and password");
        });
        it('status code should be 404 if user is already exist', () => {
            userService.getPassword = () => true;
            const userController = new UserController(
                userService,
                tokenService
            );

            userController.create(mockRequest, mockResponse);

            expect(mockResponse.status).toBeCalledTimes(1);
            expect(mockResponse.status).toBeCalledWith(404);
            expect(mockResponse.send).toBeCalledTimes(1);
            expect(mockResponse.send).toBeCalledWith("User with this email already exist");
        });
        it('status code should be 500 if user was not saved', async () => {
            userService.getPassword = () => undefined;
            userService.save = () => Error;
            const userController = new UserController(
                userService,
                tokenService
            );

            await userController.create(mockRequest, mockResponse);

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

            const userController = new UserController(
                userService,
                tokenService
            );

            await userController.create(mockRequest, mockResponse);

            expect(mockResponse.cookie).toBeCalledTimes(1);
            expect(mockResponse.cookie).toBeCalledWith("btcToken", mockToken, { httpOnly: true });
            expect(mockResponse.status).toBeCalledTimes(1);
            expect(mockResponse.status).toBeCalledWith(200);
            expect(mockResponse.json).toBeCalledTimes(1);
            expect(mockResponse.json).toBeCalledWith({ token: mockToken });
        });
    })
});