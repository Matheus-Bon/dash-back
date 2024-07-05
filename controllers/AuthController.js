const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const { fetchUserByEmail, storeUser } = require("../models/User");

const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");


//  @route /login/
//  @method POST
const login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new CustomError('Os campos não podem ser vazios', 400);
        return next(error);
    }

    const user = await fetchUserByEmail(email);
    if (!user) {
        const error = new CustomError('Usuário não encontrado', 404);
        return next(error);
    }

    const hash = user.get('credentials.password');
    const samePwd = await bcrypt.compare(password, hash);

    if (!samePwd) {
        const error = new CustomError('Senha incorreta', 401);
        return next(error);
    }

    const payload = {
        name: user.get('name'),
        phone: user.get('phone'),
        email: user.get('credentials.email'),
        role: user.get('role'),
    }

    const token = jwt.sign(
        payload,
        process.env.SECRET_STR,
        {
            expiresIn: '7d'
        }
    );


    return res.status(200).json({
        status: 'success',
        data: payload,
        token
    });
});



module.exports = {
    login
}