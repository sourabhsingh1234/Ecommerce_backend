const userModel = require('../models/model.js');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config')

exports.login = async(req, res) => {
    // console.log("");
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).send({
                success: false,
                msg: `${errors.errors[0].msg}`
            })
        }

        // check email and password is present in database
        let getUserDetails = await userModel.getUserDetails(req.body.email, req.body.password)

        // check if user details are valid means data is present in database
        if (getUserDetails.length > 0) {

            // check that email and password are correct and match with the login credentials
            if (getUserDetails[0].email == req.body.email && getUserDetails[0].password == req.body.password) {
                const jwtToken = jwt.sign({
                    email: req.body.email,
                    id: getUserDetails[0].id,
                }, config.JWT_SECRET_KEY, {
                    expiresIn: config.SESSION_EXPIRES_IN
                });
           
                return res.status(200).send({
                    success: true,
                    msg: 'Login successful',
                   Token :jwtToken,
                   response : getUserDetails
                })

                // check that password is correct or incorrect as given details in database are correct
            } else if (getUserDetails[0].password != req.body.password) {
                return res.status(200).send({
                    success: false,
                    msg: "Password is incorrect"
                })
            } 
        }else{
            return res.status(200).send({
                success: false,
                msg: "Email is not invalid"
            })
        }
    } catch (err) {
        return res.status(200).send({
            success: false,
            msg: 'Something went wrong please try again'
        })
    }
}

