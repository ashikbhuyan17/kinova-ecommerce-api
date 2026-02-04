"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongoServerError = (err) => {
    const statusCode = 409;
    let message = 'Duplicate key error';
    let errorMessages = [];
    if (err.code === 11000) {
        const fields = Object.keys(err.keyValue || {});
        message = `Duplicate value for: ${fields.join(', ')}`;
        errorMessages = fields.map(field => ({
            path: field,
            message: `The value '${err.keyValue[field]}' already exists for '${field}'`,
        }));
    }
    return {
        statusCode,
        message,
        errorMessages,
    };
};
exports.default = handleMongoServerError;
