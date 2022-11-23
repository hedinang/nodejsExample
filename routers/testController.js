const express = require('express');
const testService = require('../service/testService')
const router = express.Router();

router.get('/get', function (req, res) {
    testService.testAsync();
    res.send("aaa")
})
module.exports = router