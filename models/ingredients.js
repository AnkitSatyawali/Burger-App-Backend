const mongoose = require('mongoose');
const ingredientSchema = mongoose.Schema({
	salad: {type:Number,default:0},
    bacon: {type: Number,default:0},
    cheese: {type:Number,default:0},
    meat: {type:Number,default:0}
});

module.exports = mongoose.model("ingredients",ingredientSchema);