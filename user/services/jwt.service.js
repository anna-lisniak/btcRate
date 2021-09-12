const jwt = require("jsonwebtoken");
const GLOBAL_CONSTANTS = require("../constants");

class JwtService {
    verify(token) {
        let error = null;
        let data = {};

        jwt.verify(token, process.env.SECRET, (err, authData) => {
            error = err;
            data = authData
        });

        return { error, data };
    }
    create({ email, password }) {
        return jwt.sign(
            { email, password },
            process.env.SECRET,
            { expiresIn: GLOBAL_CONSTANTS.TOKEN_EXPIRE_TIME }
        );
    }
}

module.exports = JwtService;