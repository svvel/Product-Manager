const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        require: true
    }, 
    price:{
        type: Number,
        require: true
    },
    oldPrice:{
        type: Number,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    active:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    }

})

const productModel= mongoose.model('product', productSchema)

module.exports = productModel