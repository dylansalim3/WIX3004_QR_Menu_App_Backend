const jwt = require("jsonwebtoken");

/**
 * Middleware to verify jwt token from request header
 * and add the token content to request object
 */
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers && req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.error("Token not found in request header");
        return res.status(401).json({err: "Unauthenticated, token is missing"});
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, tokenData) => {
        if (err) {
            console.error("verify token error -> " + token);
            return res.status(401).json({err: "Unauthenticated, verify token failed"});
        }
        req.token = tokenData;
        next();
    })
}