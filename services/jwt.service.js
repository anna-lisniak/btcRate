const jwt = require("jsonwebtoken");

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
}

module.exports = JwtService;