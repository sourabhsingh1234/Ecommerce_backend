const userModel = require('../models/model.js');
// const { validationResult } = require('express-validator');
const { user } = require('../config.js');

exports.addTodo = async(req, res) => {
    try {
        req.body.user_id = req.user_id;
        let inserttodo = await userModel.inserttodo(req.body);

        if(inserttodo) {
            return res.status(200).send({
                success: true,
                msg: 'Details saved successfully'
            })
        } else {
            return res.status(200).send({
                success: false,
                msg:'Something went wrong'
            })
        }
   
    } catch (err) {
        console.log(err);
        return res.status(200).send({
            success: false,
            msg: 'Something went wrong please try again'
        })
    }
}

exports.tododetailsinfo = async (req, res) => {
    try {
        req.body.user_id = req.user_id;

        let todoinfodata = await userModel.gettodoinfo(req.body)
    
        if(todoinfodata) {
            return res.status(200).send({
                success: true,
                msg: "Data is Here!",
                data: todoinfodata[0].todo_detail
            })
        } else {
            return res.status(200).send({
                success: false,
                msg: 'Invalid user id'
            })
        }
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            msg:'Internal error'
        })
    }
}

exports.updatetodo = async (req, res) => {
    try {
        req.body.user_id = req.user_id;

        let updatedTodo = await userModel.updatedtodoinfo(req.body)
        if (updatedTodo) {
            return res.status(200).send({
                success: true,
                msg: 'todo updated successfully'
            })
        } else {
            return res.status(500).send({
                success: false,
                msg: 'Invalid details'
            })
        }


    } catch (error) {
        return res.status(404).send({
            success: false,
            msg: 'Internal error'
        })
    }
}

