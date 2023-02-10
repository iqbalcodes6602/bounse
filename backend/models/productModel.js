const mongoose = require('mongoose')
const productModel = mongoose.Schema(
    {
        kind :{
            type: String,
        },
        owner: {
            type: Object,
            ref: "User",
        },
        name: {
            type: String, trim: true,
        },
        price: {
            type: String, trim: true,
        },
        description: {
            type: String, trim: true,
        },
        images: [{
            type: String,
        }],
        forSale : {
            type: Boolean,
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productModel);

module.exports = Product;