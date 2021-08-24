const savePersonToPublicFolder = require('../../services/user/save');
const jwt = require('jsonwebtoken');
const getUserPassword = require('../../services/user/getPassword');
const GLOBAL_CONSTANTS = require('../../constants');
const DataBase = require('../../services/db');

const createUser = async (req, res, next) => {
    const { body: { email, password } } = req;
    const db = new DataBase(GLOBAL_CONSTANTS.DB_FILE_NAME);

    if (!email || !password) {
        res.status(404).send("You should provide email and password");
        return;
    }

    if (getUserPassword(db, email)) {
        res.status(404).json('User with this email already exist');
        return;
    }

    const error = await savePersonToPublicFolder(db, { email, password });
    if(error) {
        res.status(500).send('Internal server error');
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

module.exports = createUser;