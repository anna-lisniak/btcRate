const axios = require("axios");

class AuthorizationMiddleware {
    verify = async(req, res, next) => {
        const {data} = await axios("http://localhost:3000/user/verify", {data: {token: req.token}})
        
        if(!data || data !== req.token) return res.sendStatus(401);
    
        next();
    }
}

module.exports = AuthorizationMiddleware;