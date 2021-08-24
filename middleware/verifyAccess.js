const jwt = require("jsonwebtoken");
const getPassword = require("../services/user/getPassword");

const verifyAccess = (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, async (err, authData) => {
        if (err || !getPassword(authData.email)) return res.sendStatus(403);
        next();
    });
}

module.exports = {
    verifyAccess
};