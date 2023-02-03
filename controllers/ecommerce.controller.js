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

exports.productlist = async(req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(200).send({
                success: false,
                msg: `${errors.errors[0].msg}`,
            })
        }

        let saveproductlistDetails = await ecommerceModel.saveproductlistDetails(req.body)
        if(saveproductlistDetails) {
            return res.status(200).send({
                success: true,
                msg: 'Product list details saved successfully'
            })
        } else {
            return res.status(404).send({
                success: false,
                msg: 'Invalid details'
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: 'External Error',
            data: error
        })
    }
}

exports.orderpurchase = async(req, res) => {
    try {
    
        let getorderpurchase = await ecommerceModel.getorderpurchase()
        if(getorderpurchase) {
            return res.status(200).send({
                success: true,
                msg: 'Order purchase details successfully',
                data: getorderpurchase
            })
        }
    } catch (error) {
        return res.status(200).send({
            success: false,
            msg: "External Error"
        })
    }
}