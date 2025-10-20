const express = require('express');
const router = express.Router();
const { orderCreate } =  require("./orderctl")

router.post('/',orderCreate);

module.exports = router;
