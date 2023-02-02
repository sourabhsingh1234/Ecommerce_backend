const buyerModel = require('../models/buyerModel');
const { validationResult } = require('express-validator');

exports.buyer = async(req, res) => {
    try {
        req.body.user_id = req.user.id;
        let savebuyerdetails = await buyerModel.savebuyerdetails(req.body)
        if(savebuyerdetails) {
            return res.status(200).send({
                success: true,
                msg: 'Buyer details saved successfully',
                data: savebuyerdetails
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: 'Invalid request'
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