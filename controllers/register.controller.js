const userModel = require('../models/model.js');
const { validationResult } = require('express-validator');
// const speakeasy = require("speakeasy")
const CryptoJS = require("crypto-js");

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

        // Create hash password for user
        // let secret = speakeasy.generateSecret({ length: 20});
        const hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
        // console.log(req.body.password);
        let users = {
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "password": hash,
            "address_1": req.body.address_1,
            "address_2": req.body.address_2
        }

        console.log(users);
        // Here is this we save the details of all the users that have registered

        let saveUserDetails = await userModel.saveUserDetails(users)
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
        // console.log(err);
        return res.status(200).send({
            success: false,
            msg: 'User not registered due to internal error',
        })
    }
 
}

exports.updateaddress = async(req, res) => {
    try {
        req.body.user_id = req.user.id;

        let updateuseraddress = await userModel.updateuseraddress(req.body)
        // console.log(updateuseraddress);
        // return
        if(updateuseraddress) {
            return res.status(200).send({
                success: true,
                msg: "Address saved successfully"  
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: 'Invalid address'
            })
        }
    } catch (error) {
        // console.log(error);
        return res.status(200).send({
            success: false,
            msg: "External error"
        })
    }
}





