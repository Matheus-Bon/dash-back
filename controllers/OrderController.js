const { fetchOrders, editOrder } = require("../models/Order");


const asyncErrorHandler = require("../utils/asyncErrorHandler");



//  @route /orders
//  @method POST
const create = asyncErrorHandler(async (req, res, next) => {
    const newProduct = await storeProduct(req.body);

    return res.status(201).json({
        status: 'success',
        data: newProduct
    })
});

//  @route /orders
//  @method GET
const index = asyncErrorHandler(async (req, res, next) => {
    res.writeHead(200, {
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    setInterval(async () => {
        const orders = await fetchOrders();
        res.write(`data: ${JSON.stringify(orders)}\n\n`);
    }, 10000);
});

const show = asyncErrorHandler(async (req, res, next) => {
    const product = await fetchProduct(req.params.id);

    return res.status(200).json({
        status: 'success',
        data: product
    });
});

//  @route /orders/:id
//  @method PATCH
const update = asyncErrorHandler(async (req, res, next) => {
    const order = await editOrder(req.params.id, req.body);

    return res.status(200).json({
        status: 'success',
        data: order
    });
});

//  @route /orders/:id
//  @method DELETE
const destroy = asyncErrorHandler(async (req, res, next) => {
    const order = await deleteProduct(req.params.id);

    return res.status(200).json({
        status: 'success',
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