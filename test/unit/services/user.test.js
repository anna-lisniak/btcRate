const DataBase = require('../../../services/db');
const saveUser = require('../../../services/user/save');
const getUserPassword = require('../../../services/user/getPassword');

describe('User Service', () => {
    const fileName = 'testPerson.json';
    const db = new DataBase(fileName);
    const email = 'example@example.com';
    const password = 'password';

    describe('Save', () => {
        beforeEach(async () => await db.createFile(fileName));
        afterEach(() => db.deleteFile(fileName));

        it('should save new user', async () => {
            const error = await saveUser(db, { email, password })

            expect(error).toBe(null);
        });
    });
    describe('Get password', () => {
        beforeEach(async () => await db.createFile(fileName));
        afterEach(() => db.deleteFile(fileName));

        it('should return "password"', async () => {
            await saveUser(db, { email, password });

            const userPassword = getUserPassword(db, email);

            expect(userPassword).toBe(password);
        })
        it('should return undefined if user is not exist', async () => {
            const userPassword = getUserPassword(db, email);

            expect(userPassword).toBeUndefined();
        })
    })
});