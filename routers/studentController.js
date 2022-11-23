const express = require('express');
const studentService = require('../service/studentService')
const router = express.Router();

router.get('/detail/:studentId', async function (req, res) {
    let result = await studentService.detailStudent(req.params.studentId);
    res.send(result)
})
router.post('/create', async function (req, res) {
    let result = await studentService.addStudent(req.body);
    res.send(result)
})
router.put('/update', async function (req, res) {
    let result = await studentService.updateStudent(req.body);
    res.send(result)
})
router.get('/all', async function (req, res) {
    let result = await studentService.allStudent();
    res.send(result)
})
router.post('/page', async function (req, res) {
    let result = await studentService.pageStudent(req.body);
    res.send(result)
})

module.exports = router