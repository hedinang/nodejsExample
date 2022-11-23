const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelName = 'api';

const paramSchema = new Schema({
    param_name: String,
    param_type: String,
    data_type: String,
    default_value: String,
    mandatory: Boolean,
    note: String,
    auto_generate: Boolean
});

const apiSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    method: {
        type: String,
        required: true,
        index: true
    },
    group_id: {
        type: String,
        required: false,
        index: true
    },
    encryptionType: {
        type: String,
        required: true,
        index: true,
        default: true
    },
    params: {
        type: []
    },
    status: {
        type: String,
        required: true,
        default: 0
    },
    default_request_body: {
        type: String,
        required: false,
        default: 0
    },
    has_request_body: {
        type: Boolean,
        required: false,
        default: 0
    }
}, { timestamps: true });

// apiSchema.index({ accountId: 1, cardId: 1 }, { unique: true });

const ApiSchema = mongoose.model(modelName, apiSchema, modelName);
// apiSchema.cardUserSchema = cardUserSchema;

module.exports = ApiSchema;
