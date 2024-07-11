const express = require("express");

const { create, index, destroy } = require("../controllers/UserController");

const router = express.Router();

router.post('/users', create);
router.get('/users', index);
router.delete('/users/:id', destroy);


module.exports = router;