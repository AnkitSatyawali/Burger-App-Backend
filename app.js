const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoute');
const userRoutes = require('./routes/user');
const app = express();

mongoose.connect(config.database,{useNewUrlParser: true})
.then(() => {
    console.log("Connected to database");
}, err => {
    console.log(err);
    console.log("Connection Failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/public',express.static('public'));
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    	"Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods",
    	"GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
 
app.use('/orders',orderRoutes);
app.use('/authentication',userRoutes);
app.get('*',(req,res,next) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})
module.exports = app;