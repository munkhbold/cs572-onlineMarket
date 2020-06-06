const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    quatityAvailable: Number,
    retailPrice:Number,
    category: Object    

    
    // title:String,
    // imageUrl:String,
    // price:Number,
    // description:String
});

module.exports = mongoose.model('Product', productSchema);