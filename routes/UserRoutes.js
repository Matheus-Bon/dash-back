const express = require("express");

const { create } = require("../controllers/UserController");

const router = express.Router();

router
    .route('/users')
    .post('', create)

module.exports = router;