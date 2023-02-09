const { body, check} = require('express-validator');

exports.customeraccountScehma = [
    check("account_no")
        .not().isEmpty()
        .withMessage("Account number is required"),
    check('account_type')
        .not().isEmpty()
        .withMessage("Account type is required"),
    check("acc_activation_date")    
        .not().isEmpty()
        .withMessage("Account type is required"),
    check('total_balance')
        .not().isEmpty()
        .withMessage('Total balance is required')
]