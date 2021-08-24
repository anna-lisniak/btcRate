const getUserPassword = require('../../services/user/getPassword')
const jwt = require('jsonwebtoken');
const GLOBAL_CONSTANTS = require('../../constants');
const DataBase = require('../../services/db');

const login = (req, res, next) => {
    const { body: { email, password } } = req;
    const db = new DataBase(GLOBAL_CONSTANTS.DB_FILE_NAME);
    const userPassword = getUserPassword(db, email);

    if (!userPassword) {
        res.status(404).send("User with this email is not found");
        return;
    }

    if (userPassword !== password) {
        res.status(400).send("Invalid password")
        return;
    }

    const token = jwt.sign(
        { email, password },
        process.env.SECRET,
        { expiresIn: GLOBAL_CONSTANTS.TOKEN_EXPIRE_TIME }
    );

    res.cookie("btcToken", token, { httpOnly: true });
    res.status(200).json({ token });
}

module.exports = login;