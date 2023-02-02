const { body, check} = require('express-validator');

exports.companyScehma = [
    check('sub_category_id')
        .not().isEmpty()
        .withMessage('sub category id is required'),
    check('company_name')
        .not().isEmpty()
        .withMessage("Company_name is required"),
    check('company_description')
        .not().isEmpty()
        .withMessage("Company_description is required"),    
]