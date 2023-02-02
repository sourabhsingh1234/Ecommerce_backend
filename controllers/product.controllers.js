const productModel = require('../models/productModels');
const { validationResult } = require('express-validator');

exports.company = async(req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(200).send({
                success: false,
                msg: `${errors.errors[0].msg}`,
            })
        } 

        let saveProductsDetails = await productModel.saveProductsDetails(req.body);
        if(saveProductsDetails) {
            return res.status(200).send({
                success: true,
                msg: 'Company saved successfully',
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: 'Invalid details! product not saved'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(200).send({
            success: false,
            msg: 'External Error'
        })
    }
}