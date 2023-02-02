require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// const assert = require("assert");
const dotenv = require("dotenv");
const {
    routes
} = require('./routes/routes');


app.use(express.urlencoded({extended: false}))  
app.use(bodyParser.urlencoded({extended: false}));  

// To get access express
app.use(express.json()); 
app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
    // This function is called 
    // console.log(req, 'req');
    res.send("node is running")
})
// middleware 
app.use("/api/", routes)

if (module === require.main) {
    var server = app.listen(process.env.PORT || 7800, function () {
 //   var server = httpsServer.listen(process.env.PORT || 6029, function () {
         var port = server.address().port;
         console.log("App listening on port %s", port);
     });
 }
