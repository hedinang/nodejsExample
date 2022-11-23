const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uuid = require('node-uuid');
const modelName = 'grade';

const gradeSchema = new Schema({
    id: {
        type: String,
        required: true,
        index: true,
        default: uuid.v4()
    },
    name: String,
    status: String
}, { timestamps: true });
const ApiSchema = mongoose.model(modelName, gradeSchema, modelName);

module.exports = ApiSchema;