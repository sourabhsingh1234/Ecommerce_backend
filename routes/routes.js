require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require('../config.js');
const db = require('../connection.js');
const app = express();
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// All controllers call here

const registerController = require('../controllers/register.controller');
const loginController = require('../controllers/login.controller');
// const todoController = require('../controllers/todo.controller');
const productController = require('../controllers/product.controllers');
const ecommerceController = require('../controllers/ecommerce.controller');
const buyerController = require('../controllers/buyer.controller');

// All Validations call here

const {registorUserSchema, loginSchema, forgetPasswordScehma} = require('../middleware/userValidator')
// const {todoSchema, todoinfoSchema} = require('../middleware/todovalidator');
const { verify } = require('jsonwebtoken');
const {companyScehma} = require('../middleware/productValidators');
const {ecommerceScehma, subcategoryScehma, productScehma} = require('../middleware/ecommerceValidator');

// All post api call here
router.post('/userRegister', registorUserSchema, registerController.userRegistor.bind());
router.post('/login', loginSchema, loginController.login.bind());
router.post('/category', ecommerceScehma, ecommerceController.category.bind());
router.post('/subcategory', subcategoryScehma, ecommerceController.subcategory.bind());
router.post('/company',companyScehma, productController.company.bind());
router.post('/productlist', productScehma, ecommerceController.productlist.bind())
router.post('/buyer', ensureWebToken, buyerController.buyer.bind())

// All get api call here
router.get('/orderpurchase', ecommerceController.orderpurchase.bind())

// router.post('/addtodo', ensureWebToken, todoController.addTodo.bind());
// router.get('/tododetails:info', ensureWebToken, todoController.tododetailsinfo.bind());
// router.post('/updatetodo', ensureWebToken, todoController.updatetodo.bind());



function ensureWebToken(req, res, next) {
    const x_access_token = req.headers['authorization'];
    if(typeof x_access_token !== undefined) {
        req.token = x_access_token;
        verifyJWT(req, res, next);
    }else {
        res.sendStatus(403);
    }
}

async function verifyJWT(req, res, next) {
    jwt.verify(req.token, config.JWT_SECRET_KEY, async function (err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            const _data = await jwt.decode(req.token, {
                complete: true,
                json: true
            });
            req.user = _data['payload'];
            req.user_id = req.user.id;
            req.email = req.user.email;
            next();
        }
    })

}



module.exports.routes = router;