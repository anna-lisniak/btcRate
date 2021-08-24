const getUserPassword = (db, email) => {
    const users = db.read();
    return users[email];
}

module.exports = getUserPassword;