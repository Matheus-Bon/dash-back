const { storeUser, fetchUsers, deleteUser } = require("../models/User");

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
        status: 'success',
        data: {
            name: newUser.get('name'),
            phone: newUser.get('phone'),
            email: newUser.get('credentials.email'),
            role: newUser.get('role'),
        }
    })
});

//  @route /users
//  @method GET
const index = asyncErrorHandler(async (req, res, next) => {
    let { page, limit, search, role } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const users = await fetchUsers(page, limit, search, role);

    return res.status(200).json({
        sattus: 'success',
        data: users
    });
});

//  @route /users/:id
//  @method DELETE
const destroy = asyncErrorHandler(async (req, res, next) => {
    await deleteUser(req.params.id);

    return res.status(200).json({
        status: 'success',
        data: {}
    });
});

module.exports = {
    create,
    index,
    destroy
}