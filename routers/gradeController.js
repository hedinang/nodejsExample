const express = require('express');
const gradeService = require('../service/gradeService')
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Hello World!')
})
router.post('/', async function (req, res) {
    let result = await gradeService.addGrade(req.body);
    res.send(result)
})
router.delete('/:gradeId', async function (req, res) {
    let result = await gradeService.deleteGrade(req.params.gradeId);
    res.send(result)
})

module.exports = router