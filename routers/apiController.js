const express = require('express');
const apiService = require('../service/apiService')
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Hello World!')
})
router.post('/', async function (req, res) {
    let a = await apiService.addApi(req.body);
    res.send('aa')
})

module.exports = router