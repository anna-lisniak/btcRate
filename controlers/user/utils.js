const fs = require("fs");

const readUsers = () => JSON.parse(fs.readFileSync("./person.json").toString());

const findUser = (email) => {
    const users = readUsers();
    return users[email];
}

module.exports = {
    readUsers,
    findUser
}