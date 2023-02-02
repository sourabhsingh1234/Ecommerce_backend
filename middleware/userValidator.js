const { body, check} = require('express-validator');

exports.registorUserSchema = [
    check('first_name')
        .not().isEmpty()
        .withMessage('First name is required')
        .isAlpha()
        .withMessage('First name must be only alphabetical chars')
        .isLength({ min:3 })
        .withMessage('First name must be at least 3 chars long'),
    check('last_name')
        .not().isEmpty()
        .withMessage('First name is required')
        .isAlpha()
        .withMessage('First name must be only alphabetical chars')
        .isLength({ min:3 })
        .withMessage('First name must be at least 3 chars long'),
    check('email')
        .not().isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email'),
    check('password')
        .not().isEmpty()
        .withMessage('Password is required')
        .isLength({ min:6 })
        .withMessage('Password must be at least 6 chars long'),
    check('confirm_password')
        .not().isEmpty()
        .custom((value, {req, res}) => value === req.body.password)
        .withMessage('Password and Confirm password  do not match')    
]

exports.loginSchema = [
    check('email')
       .not().isEmpty()
       .withMessage('Email is required')
       .isEmail()
       .withMessage('Email must be a valid email'),
    check('password')
        .not().isEmpty()
        .withMessage('Password is required'),   
]

exports.forgetPasswordScehma = [
    check('password')
        .not().isEmpty()
        .withMessage('New password is required'),
    check('new_password')
        .not().isEmail()
        .withMessage('Password is required'),
    check('confirm_password')
        .not().isEmpty()
        .custom((value, {req, res}) => value === req.body.new_password)
        .withMessage('Password and Confirm password  do not match') 
]

