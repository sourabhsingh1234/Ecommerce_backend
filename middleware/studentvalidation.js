const { body, check} = require('express-validator');

exports.studentScehma = [
    check('student_name')
        .not().isEmpty()
        .withMessage('student name is required'),
    check('student_email')
        .not().isEmpty()
        .withMessage("student email is required"),
    check('student_rollnumber')
        .not().isEmpty()
        .withMessage("Company_description is required"),
    check('student_mobile')
        .not().isEmpty()
        .withMessage("student_mobile is required"),
    check("student_branch")
        .not().isEmpty()
        .withMessage("student branch is required"),                 
]