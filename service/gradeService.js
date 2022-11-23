const mongodb = require('../model/index')
const mongoose = require('mongoose');
const httpStatus = require('http-status-codes');
const message = require('../config/message');
async function addGrade(grade) {
    let result = await mongodb.Grade.create(grade);
    return result
}

async function deleteGrade(gradeId) {
    let demo = {
        id: "016f0914-55b3-43b0-a001-cc335f095e1a",
        name: "FFF",
        age: 12
    }
    let apiResponse = {}
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (!gradeId) {
            throw Error("id hasn't existed !")
        }
        let result = await mongodb.Grade.findOneAndUpdate({ id: gradeId }, { status: 'REMOVED' }, { new: true, session });
        let student = await mongodb.Student.findOneAndUpdate({ id: demo.id }, demo, { new: true, session });
        apiResponse.data = result;
        apiResponse.status = 'OK';
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        apiResponse.status = httpStatus.StatusCodes.OK
        apiResponse.message = message.BAD_REQUEST;
    }
    return apiResponse
}

module.exports = {
    addGrade,
    deleteGrade
}