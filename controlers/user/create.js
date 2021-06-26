const { readUsers } = require("./utils");
const fs = require("fs");

const savePersonToPublicFolder = ({ email, password }, callback) => {
    const users = readUsers();

    fs.writeFile('./person.json', JSON.stringify({
        ...users,
        [email]: password
    }), callback);
}

module.exports = savePersonToPublicFolder;