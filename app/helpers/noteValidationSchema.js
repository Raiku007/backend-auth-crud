const { body } = require('express-validator');

const noteValidationSchema = {
    title: {
        notEmpty: {
            errorMessage: 'Title is required'
        },
        isLength: {
            options: { max: 100 },
            errorMessage: 'Title should not exceed 100 characters'
        }
    },
    body: {
        notEmpty: {
            errorMessage: 'Body is required'
        },
        isLength: {
            options: { max: 255 },
            errorMessage: 'Body should not exceed 255 characters'
        }
    }
};

module.exports = noteValidationSchema;
