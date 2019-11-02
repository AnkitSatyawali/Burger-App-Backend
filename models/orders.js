const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    ingredients: {
        bacon : {type:Number,default:0},
        cheese : {type:Number,default:0},
        meat : {type:Number,default:0},
        salad : {type:Number,default:0}
    },
    price : {type:Number,required:true},
    orderData : {
        name : {type:String,required:true},
        email : {type:String,required:true},
        country : {type:String,required:true},
        deliveryMethod : {type:String,required:true},
        street : {type: String,required:true},
        postalCode : {type:Number,required:true}
    },
    userId:{type:String,required:true}
});

module.exports = mongoose.model("orders",orderSchema);