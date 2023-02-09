const customeraccountModel = require('../models/customeraccountmodels');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config');
const CryptoJS = require("crypto-js");
const requestIp = require('request-ip');

exports.customeraccountdetails = async(req, res) => {
    try {
        req.body.customer_id = req.clients.id
        // console.log(req.body.customer_id);

        let savecustomeraccountdetails = await customeraccountModel.savecustomeraccountdetails(req.body)
        if(savecustomeraccountdetails) {
            return res.status(200).send({
                success: true,
                msg: 'Customer account details saved'
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: 'Invalid error account details not saved'
            })
        }

    } catch (error) {
        console.log(error, '11111');
        return res.status(200).send({
            success: false,
            msg: "External error"
        })
    }
}
exports.transactioninfo = async(req, res) => {
    try {
        req.body.customer_id = req.clients.id

        let savetransactioninfodetails = await customeraccountModel.savetransactioninfodetails(req.body)
        if(savetransactioninfodetails) {
            return res.status(200).send({
                success: true,
                msg: 'Transaction details saved'
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: 'Invalid details try again'
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

exports.customerdetails = async(req, res) => {
    try {
        
        let getcustomerdetails = await customeraccountModel.getcustomerbankdetails()
        if(getcustomerdetails) {
            return res.status(200).send({
                success: true,
                msg: 'Customer bank details are here',
                data: getcustomerdetails
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: 'Invaild'
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: 'External error'
        })
    }
}

