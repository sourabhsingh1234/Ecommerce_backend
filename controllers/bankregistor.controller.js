const bankModel = require('../models/bankmodel.js');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config');
const CryptoJS = require("crypto-js");
const requestIp = require('request-ip');

exports.bankregistor = async(req, res) => {
    try {
        const errors = validationResult(req)
        // console.log(errors);
        if(!errors.isEmpty()) {
            return res.status(200).send({
                success: false,
                msg: `${errors.errors[0].msg}`,
            })
        } 

        let getbankuseremail = await bankModel.getbankuserdetails(req.body.clients_email)
        if(getbankuseremail.length > 0) {
            return res.status(200).send({
                success: false,
                msg: 'User account is available'
            })
        } 

        const hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);

        let users = {
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "clients_email": req.body.clients_email,
            "password": hash,
            "clients_address": req.body.clients_address,
            "mobile_no": req.body.mobile_no
        }

        let savebankuserdetails = await bankModel.savebankuserdetails(users)
        if(savebankuserdetails) {
            let usersavtivity = {user_id: savebankuserdetails, activity_type: "bankuserregistor", ip: requestIp.getClientIp(req)}
            let activitytable = await bankModel.insertactivity(usersavtivity)

            if(activitytable) {
                return res.status(200).send({
                    success: true,
                    msg: 'Activity data saved successfully'
                })
            }
            return res.status(200).send({
                success: true,
                msg: 'Bank user details saved'
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: 'Invalid error while saving data'
            })
        }
    } catch (error) {
        // console.log(error);
        return res.status(200).send({
            success: false,
            msg: 'external error'
        })
    }
}

exports.customerlogin = async(req, res) => {
    try {
        const errors = validationResult(req)
        // console.log(errors);
        if(!errors.isEmpty()) {
            return res.status(200).send({
                success: false,
                msg: `${errors.errors[0].msg}`,
            })
        }

        let getcustomerdetailsinfo = await bankModel.getbankuserdetails(req.body.clients_email)

        if(getcustomerdetailsinfo.length > 0) {

            let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
            if(getcustomerdetailsinfo[0].password == hash) {
                const jwtToken = jwt.sign({
                    email: req.body.email,
                    id: getcustomerdetailsinfo[0].id,
                }, config.JWT_SECRET_KEY, {
                    expiresIn: config.SESSION_EXPIRES_IN
                });

                //activity
                await bankModel.insertactivity({
                    "user_id": getcustomerdetailsinfo[0].id,
                    "activity_type": 'Login',
                    "ip": requestIp.getClientIp(req)
                });

                return res.status(200).send({
                    success: true,
                    msg: "Login successfully",
                    Token :jwtToken,
                    data : getcustomerdetailsinfo
                })
            } else {
                return res.status(200).send({
                    success: false,
                    msg: 'Invlid login details'
                })
            }   
        } else {
            return res.status(200).send({
                success: false,
                msg: "Internal error"
            })
        }
    } catch (error) {
        // console.log(error);
        return res.status(200).send({
            success: false,
            msg: 'External error'
        })
    }
}