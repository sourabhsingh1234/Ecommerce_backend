const { body, check} = require('express-validator');

exports.bankScehma = [
    check('first_name')
        .not().isEmpty()
        .withMessage('First name is required'),
    check('last_name')
        .not().isEmpty()
        .withMessage('Last name is required'),
    check('clients_email')
        .not().isEmpty()
        .withMessage('Clients email is required'),
    check('password')
        .not().isEmpty()
        .withMessage('Password is required')
        .isLength({ min:6 })
        .withMessage('Password must be at least 6 chars long'),
    check('confirm_password')
        .not().isEmpty()
        .custom((value, {req, res}) => value === req.body.password)
        .withMessage('Password and Confirm password  do not match'),       
    check('clients_address')    
        .not().isEmpty()
        .withMessage('Clients address is required'),
    check('mobile_no')
        .not().isEmpty()
        .withMessage('Clients mobile number is required')    
        
]
exports.customerScehma = [
    check('clients_email')
        .not().isEmpty()
        .withMessage('Clients email is required'),
    check('password')
        .not().isEmpty()
        .withMessage('Password is required')    
]