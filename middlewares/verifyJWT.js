const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

const verifyJWT = (req, res, next) => {
    console.log(req)
    const token = req.cookies.jwt;
    if (!token) {
        const error = new CustomError('Sem autorização', 401);
        return next(error);
    }

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                const error = new CustomError('Token inválido', 403);
                return next(error);
            }

            req.user = decoded;
            next();
        }
    );
}

module.exports = verifyJWT;
