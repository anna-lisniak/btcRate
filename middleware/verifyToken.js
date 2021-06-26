const verifyToken = (req, res, next) => {
    const { headers: { authorization: bearerHeader } } = req;
    if (!bearerHeader) return res.sendStatus(403);

    const [_, bearerToken] = bearerHeader.split(" ");
    req.token = bearerToken;
    next();
}

module.exports = {
    verifyToken, 
}