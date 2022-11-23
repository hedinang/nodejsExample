const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uuid = require('node-uuid');
const modelName = 'student';

const studentSchema = new Schema({
    id: {
        type: String,
        required: true,
        index: true,
        default: uuid.v4()
    },
    name: String,
    age: Number,
    grade_list: [],
    status: String
}, { timestamps: true });
const ApiSchema = mongoose.model(modelName, studentSchema, modelName);

module.exports = ApiSchema;