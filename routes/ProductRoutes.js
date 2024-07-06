const express = require("express");
const router = express.Router();

const { index, create, destroy, show, update } = require('../controllers/ProductController');

router.route('/products')
    .get(index)
    .post(create);

router.route('/products/:id')
    .get(show)
    .delete(destroy)
    .put(update);

module.exports = router;
