const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        const error = new CustomError('Sem autorização', 401);
        return next(error);
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.SECRET_STR,
        (err, decoded) => {
            if (err) {
                const error = new CustomError('Token inválido', 403);
                return next(error);
            }

            req.user = decoded;

            next();
        }
    )
}

module.exports = verifyJWT;