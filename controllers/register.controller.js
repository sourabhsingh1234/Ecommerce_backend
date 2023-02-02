const userModel = require('../models/model.js');
const { validationResult } = require('express-validator');

exports.userRegistor = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(200).send({
                success: false,
                msg: `${errors.errors[0].msg}`,
            })
        } 
        
        // send mail from postman and store in getUserEmail
        let getUserEmail = await userModel.getUserDetails(req.body.email);

        // check mail id is present in database
        if(getUserEmail.length > 0) {
            return res.status(200).send({
                success:false,
                msg: 'Email is already registered! Try with new email address'
            })
        }

        // Here is this we save the details of all the users that have registered

        let saveUserDetails = await userModel.saveUserDetails(req.body)
        if(saveUserDetails) {
            return res.status(200).send({
                success: true,
                msg: "Account registered successfully"
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "Something went wrong! Please try again later"
            })
        }

    } catch (err) {
        return res.status(200).send({
            success: false,
            msg: 'User not registered due to internal error',
        })
    }
 
}





