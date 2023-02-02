const ecommerceModel = require('../models/ecommerceModel');
const { validationResult } = require('express-validator');

exports.category = async(req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(200).send({
                success: false,
                msg: `${errors.errors[0].msg}`,
            })
        } 

        let savecategoryDetails = await ecommerceModel.savecategoryDetails(req.body);
        if(savecategoryDetails) {
            return res.status(200).send({
                success: true,
                msg: 'category details saved'
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: 'category details not saved'
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: "External error occurred"
        })
    }
}

exports.subcategory = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(200).send({
                success: false,
                msg: `${errors.errors[0].msg}`,
            })
        } 

        let savesubcategoryDetails = await ecommerceModel.savesubcategoryDetails(req.body)

        if(savesubcategoryDetails) {
            return res.status(200).send({
                success: true,
                msg: "Sub category details saved"
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: "Sub category details invalid"
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: 'External error occurred'
        })
    }
}