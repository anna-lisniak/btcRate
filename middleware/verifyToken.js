const verifyToken = (req, res, next) => {
    if ("btcToken" in req.cookies) {
        req.token = req.cookies.btcToken;
        return next();
    }

    const { headers: { authorization: bearerHeader } } = req;
    if (!bearerHeader) return res.sendStatus(403);

    const [type, bearerToken] = bearerHeader.split(" ");
    if(type !== "Bearer") {
        res.status(401).send();
    }
    req.token = bearerToken;
    next();
}

module.exports = {
    verifyToken,
}