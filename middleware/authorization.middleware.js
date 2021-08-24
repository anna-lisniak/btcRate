class AuthorizationMiddleware {
    constructor(tokenService, checkIfPasswordExist) {
        this.tokenService = tokenService;
        this.checkIfPasswordExist = checkIfPasswordExist;
    }

    verify = (req, res, next) => {
        const { error, data: { email } } = this.tokenService.verify(req.token);
        if (error || !this.checkIfPasswordExist(email)) {
            return res.sendStatus(403);
        }

        next();
    }
}

module.exports = AuthorizationMiddleware;