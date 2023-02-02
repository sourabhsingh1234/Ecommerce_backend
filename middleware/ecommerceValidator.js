const { body, check} = require('express-validator');

exports.ecommerceScehma = [
    check('category_name')
        .not().isEmpty()
        .withMessage('category is required')
]

exports.subcategoryScehma = [
    check('category_id')
        .not().isEmpty()
        .withMessage('category_id is required'),
    check('sub_category_name')
        .not().isEmpty()
        .withMessage('sub_category is required')
]