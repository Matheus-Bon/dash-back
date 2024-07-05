const asyncErrorHandler = require("../utils/asyncErrorHandler");

//  @route /users
//  @method POST
const create = asyncErrorHandler(async (req, res, next) => {
    const user = {
        name: req.body.name,
        phone: req.body.phone,
        role: req.body.role,
        "credentials.email": req.body.email,
        "credentials.password": req.body.password,
    }
    const newUser = await storeUser(user);

    return res.status(201).json({
        sattus: 'success',
        data: {
            name: newUser.get('name'),
            phone: newUser.get('phone'),
            email: newUser.get('credentials.email'),
            role: newUser.get('role'),
        }
    })
});

module.exports = {
    create
}