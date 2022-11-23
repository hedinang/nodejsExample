const mongodb = require('../model/index')
const _ = require('lodash');
async function addStudent({ name, age, gradeList }) {
    let apiResponse = {}
    let student = {
        name,
        age,
        grade_list: gradeList
    }
    try {
        let result = await mongodb.Student.create(student);
        apiResponse.data = result;
        apiResponse.status = 'OK';
    } catch (error) {
        console.log(error)
        apiResponse.status = 'BAD_REQUEST';
        apiResponse.message = error.message;
    }
    return apiResponse
}
async function updateStudent({ id, name, age, gradeList }) {
    let apiResponse = {}
    let student = {
        name,
        age,
        grade_list: gradeList
    }
    try {
        if (!id) {
            throw Error("id hasn't existed !")
        }
        let filter = { id: id };
        let result = await mongodb.Student.findOneAndUpdate(filter, student, { new: true });
        apiResponse.data = result;
        apiResponse.status = 'OK';
    } catch (error) {
        console.log(error)
        apiResponse.status = 'BAD_REQUEST';
        apiResponse.message = error.message;
    }
    return apiResponse
}
async function detailStudent(studentId) {
    let apiResponse = {}
    let studentList = await mongodb.Student.aggregate([
        { $match: { id: studentId } },
        { $unwind: '$grade_list' },
        {
            $lookup: { from: 'grade', localField: 'grade_list', foreignField: 'id', as: 'grade' }
        },
        { $unwind: '$grade' },
        { $project: { _id: 0, name: 1, age: 1, grade: '$grade.name' } }
    ])
    let res = {}
    if (studentList.length) {
        res.name = studentList[0].name
        res.age = studentList[0].age
        res.gradeList = []
        _.each(studentList, e => {
            res.gradeList.push(e.grade)
        })
    }
    apiResponse.data = res;
    apiResponse.status = 'OK';
    return apiResponse
}
async function allStudent() {
    let apiResponse = {}
    let studentList = await mongodb.Student.find().lean();
    let gradeSet = new Set()
    for (const e of studentList) {
        for (const f of e.grade_list) {
            gradeSet.add(f)
        }
    }
    const array = Array.from(gradeSet);
    let gradeList = await mongodb.Grade.find({ id: { $in: array } }).lean();
    let gradeMap = new Map();
    gradeList.forEach(e => gradeMap.set(e.id, e.name))
    let result = studentList.map(e => {
        let student = {
            name: e.name,
            age: e.age
        }
        let grade = []
        for (const f of e.grade_list) {
            grade.push(gradeMap.get(f))
        }
        student.gradeList = grade
        return student
    })
    apiResponse.data = result;
    apiResponse.status = 'OK';
    return apiResponse
}
async function pageStudent({ from, size, where }) {
    let apiResponse = {}
    let studentList = await mongodb.Student.aggregate([
        { $sort: { createdAt: -1 } },
        { $skip: from || 0 },
        { $limit: size || 20 }
    ])
    let gradeSet = new Set()
    for (const e of studentList) {
        for (const f of e.grade_list) {
            gradeSet.add(f)
        }
    }
    const array = Array.from(gradeSet);
    let gradeList = await mongodb.Grade.find({ id: { $in: array } }).lean();
    let gradeMap = new Map();
    gradeList.forEach(e => gradeMap.set(e.id, e.name))
    let result = studentList.map(e => {
        let student = {
            name: e.name,
            age: e.age
        }
        let grade = []
        for (const f of e.grade_list) {
            grade.push(gradeMap.get(f))
        }
        student.gradeList = grade
        return student
    })
    apiResponse.data = result;
    apiResponse.status = 'OK';
    return apiResponse
}
module.exports = {
    addStudent,
    detailStudent,
    updateStudent,
    allStudent,
    pageStudent
}