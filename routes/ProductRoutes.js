const express = require("express");
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');
const { index, store, destroy, show, create } = require('../controllers/ProductController');

router.route('/products')
    .get(verifyJWT, index)
    .post(verifyJWT, store);

router.route('/products/:id')
    .get(verifyJWT, show)
    .delete(verifyJWT, destroy)
    .put(verifyJWT, create);

module.exports = router