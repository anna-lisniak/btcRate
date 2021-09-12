const DataBase = require('../../../services/db');
const UserService = require('../../../services/user.service');

describe('User Service', () => {
    const fileName = 'testPerson.json';
    const db = new DataBase(fileName);
    const email = 'example@example.com';
    const password = 'password';
    const userService = new UserService(db);

    describe('Save', () => {
        beforeEach(async () => await db.createFile(fileName));
        afterEach(() => db.deleteFile(fileName));

        it('should save new user', async () => {
            const error = await userService.save({ email, password })

            expect(error).toBe(null);
        });
    });
    describe('Get password', () => {
        beforeEach(async () => await db.createFile(fileName));
        afterEach(() => db.deleteFile(fileName));

        it('should return "password"', async () => {
            await userService.save({ email, password });

            const userPassword = userService.getPassword(email);

            expect(userPassword).toBe(password);
        })
        it('should return undefined if user is not exist', async () => {
            const userPassword = userService.getPassword(email);

            expect(userPassword).toBeUndefined();
        })
    })
});