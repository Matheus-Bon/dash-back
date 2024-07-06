const {
    storeProduct,
    fetchProducts,
    fetchProduct,
    editProduct,
    deleteProduct
} = require("../models/Product");

const asyncErrorHandler = require("../utils/asyncErrorHandler");



//  @route /products
//  @method POST
const create = asyncErrorHandler(async (req, res, next) => {
    const newProduct = await storeProduct(req.body);

    return res.status(201).json({
        sattus: 'success',
        data: newProduct
    })
});

//  @route /products
//  @method GET
const index = asyncErrorHandler(async (req, res, next) => {
    const { page, limit, search } = req.body;
    const products = await fetchProducts(page, limit, search);

    return res.status(200).json({
        sattus: 'success',
        data: products
    });
});

const show = asyncErrorHandler(async (req, res, next) => {
    const product = await fetchProduct(req.params.id);

    return res.status(200).json({
        sattus: 'success',
        data: product
    });
});

//  @route /products/:id
//  @method POST
const update = asyncErrorHandler(async (req, res, next) => {
    const product = await editProduct(req.params.id, req.body);

    return res.status(200).json({
        sattus: 'success',
        data: product
    });
});

//  @route /products/:id
//  @method DELETE
const destroy = asyncErrorHandler(async (req, res, next) => {
    const product = await deleteProduct(req.params.id);

    return res.status(200).json({
        sattus: 'success',
        data: product
    });
});

module.exports = {
    show,
    destroy,
    create,
    update,
    index
}