const { promises: fs, existsSync, readFileSync,unlinkSync } = require('fs');

class DataBase {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async createFile() {
        if (existsSync(this.fileName)) return;
        await fs.writeFile(`${this.fileName}`, JSON.stringify({}));
    }

    deleteFile() {
        if (!existsSync(this.fileName)) return;
        unlinkSync(`${this.fileName}`);
    }

    read() {
        return this._parse(readFileSync(this.fileName).toString());
    }

    _parse(data) {
        return JSON.parse(data);
    }

    async save(data) {
        try {
            await fs.writeFile(this.fileName, JSON.stringify(data));
            return null
        } catch(e) {
            return e;
        }
    }
}

module.exports = DataBase;