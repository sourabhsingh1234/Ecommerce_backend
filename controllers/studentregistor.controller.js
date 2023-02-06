const studentModel = require('../models/studentmodel.js');
const { validationResult } = require('express-validator');
const CryptoJS = require("crypto-js");

exports.student = async(req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(200).send({
                success: false,
                msg: `${errors.errors[0].msg}`,
            })
        } 

        let saveUserDetails = await studentModel.savestudentdetails(req.body)
            if(saveUserDetails) {
                return res.status(200).send({
                    success: true,
                    msg: "Student details saved"
                })
            } else {
                return res.status(200).send({
                    success: false,
                    msg: "Student details not saved, PLease try again"
                })
            } 
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: 'External error'
        })
    }
}