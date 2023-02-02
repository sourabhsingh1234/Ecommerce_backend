const { body, check} = require('express-validator');

exports.todoSchema = [
    check('user_id')
        .not().isEmpty()
        .withMessage('user_id is required'),
    check('user_name')
        .not().isEmpty()
        .withMessage('user_name is required'),
    check('user_description')
        .not().isEmpty()
        .withMessage('user_description is required'),    
        
]

exports.todoinfoSchema = [
    check('user_id')
        .not().isEmpty()
        .withMessage('user_id is required'),
]