const express = require("express");

const { index, update } = require("../controllers/OrderController");

const router = express.Router();

router.route('/orders')
    .get(index)

router.route('/orders/:id')
    .patch(update);


module.exports = router;