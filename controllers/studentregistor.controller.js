const studentModel = require('../models/studentmodel.js');
const { validationResult } = require('express-validator');
const CryptoJS = require("crypto-js");
const requestIp = require('request-ip');

exports.student = async(req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(200).send({
                success: false,
                msg: `${errors.errors[0].msg}`,
            })
        } 

        // console.log(saveUserDetails);
        let saveUserDetails = await studentModel.savestudentdetails(req.body)
            if(saveUserDetails) {
                // console.log(saveUserDetails);
                let usersavtivity = {user_id: saveUserDetails, activity_type: "registor", ip: requestIp.getClientIp(req)}
                let activitytable = await studentModel.insertactivity(usersavtivity)
                if(activitytable) {
                    return res.status(200).send({
                        success: true,
                        mag: "Activity data saved successfully"
                    })
                }
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
        console.log(error);
        return res.status(200).send({
            success: false,
            msg: 'External error'
        })
    }
}

exports.feesdata = async(req, res) => {
    try {
        let savefeesdata = studentModel.insertfees(req.body)
        if(savefeesdata) {
            return res.status(200).send({
                success: true,
                msg:'Fees updated successfully'
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "Invalid"
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: 'External error'

        })
    }
}

exports.studentfeesdetails = async(req, res) => {
    try {
        
        let getstudentfeesdetails = await studentModel.getstudentfeesdetails()
        if(getstudentfeesdetails) {
            return res.status(200).send({
                success: false,
                msg: "Details of student are here",
                data: getstudentfeesdetails
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "Invalid"
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: 'External error'

        })
    }
}