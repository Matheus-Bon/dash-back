const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization || req.query.token;
   
    if (!token) {
        const error = new CustomError('Sem autorização', 401);
        return next(error);
    }

    const tk = token.replace('Bearer ', '');

    jwt.verify(
        tk,
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
