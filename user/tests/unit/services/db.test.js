const { existsSync } = require('fs');
const DataBase = require('../../../services/db');

describe('db', () => {
    const fileName = 'testFile.json';
    const db = new DataBase(fileName);
    
    describe('createFile', () => {
        it('should create new file', async () => {
            expect(existsSync(fileName)).toBe(false);

            await db.createFile();

            expect(existsSync(fileName)).toBe(true);

            db.deleteFile();
        })

        it('should not create new file if it is already exist', async () => {
            expect(existsSync(fileName)).toBe(false);
            
            await db.createFile();
            
            expect(existsSync(fileName)).toBe(true);

            await db.createFile();

            expect(existsSync(fileName)).toBe(true);

            db.deleteFile();
        })
    })
    describe('deleteFile', () => {
        it('should delete file', async () => {
            expect(existsSync(fileName)).toBe(false);

            await db.createFile();

            expect(existsSync(fileName)).toBe(true);

            db.deleteFile();

            expect(existsSync(fileName)).toBe(false);
        })
        it('should not delete file if it is not exist', async () => {
            expect(existsSync(fileName)).toBe(false);

            db.deleteFile();

            expect(existsSync(fileName)).toBe(false);
        })
    })
})
