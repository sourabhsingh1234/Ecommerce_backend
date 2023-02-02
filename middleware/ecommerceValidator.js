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
exports.productScehma = [
    check('product_name')
        .not().isEmpty()
        .withMessage('product is required'),
    check('product_description')
        .not().isEmpty()
        .withMessage('product description is required'),
    check('product_expirydate')
        .not().isEmpty()
        .withMessage('product expiry date is required'),
    check('product_mfg')
        .not().isEmpty()
        .withMessage('product mfg is required'),
    check('sub_category_id')
        .not().isEmpty()
        .withMessage('sub_category_id is required'),                
]