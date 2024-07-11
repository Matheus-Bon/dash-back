const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const { fetchUserByEmail } = require("../models/User");

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
        const error = new CustomError('Senha incorreta', 400);
        return next(error);
    }

    const payload = {
        name: user.get('name'),
        phone: user.get('phone'),
        email: user.get('credentials.email'),
        role: user.get('role'),
    }

    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    payload.accessToken = accessToken;

    return res.status(200).json({
        status: 'success',
        data: payload
    });
});

//  @route /logout/
//  @method POST
const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({
        status: 'success',
        message: 'Logout realizado com sucesso'
    });
};

module.exports = {
    login, logout
}