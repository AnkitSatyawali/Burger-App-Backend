const express = require('express');
const router = express.Router();
const Order = require('../models/orders');
const Ingredient = require('../models/ingredients');
const checkAuth = require('../middleware/checkAuth');

router.get('/bookOrder',checkAuth,(req,res,next) => {
    Order.find({userId:req.user.userId}).then(orders => {
        res.status(200).json({
            data:orders
        })
    }).catch(err => {
        res.status(500).json({
            message:"Order fetching failed"
        })
    })
}) 
router.post('/bookOrder',checkAuth,(req,res,next) => {
    console.log(req.body);
    let order = new Order(req.body);
    console.log(order);
    order.save().then(result => {
        res.status(200).json({
            id:result._id
        }) 
    }).catch(err => {
        res.status(500).json({
			message:"Order creation failed"
		});
    });
    
})
router.get('/ingredients',(req,res,next) => {
    Ingredient.find().then(ingredients => {
        res.status(200).json({
            data:ingredients[0]
        })
    }).catch(err => {
        res.status(500).json({
            message:"Ingredients fetching failed"
        })
    })
})
module.exports = router;