const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const registerProduct = asyncHandler(async (req,res) => {
    const { kind, owner, name, price, description, images, forSale } = req.body;

    if( !kind || !name || !price || !description || !images){
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const product = await Product.create({
        kind,
        owner,
        name,
        price,
        description,
        images,
        forSale
    });

    if(product){
        res.status(201).json({
            _id: product._id,
            kind: product.kind,
            owner: product.owner,
            name: product.name,
            price: product.price,
            description: product.description,
            images: product.images,
            forSale: product.forSale,
        });
    }else{
        res.status(400);
        throw new Error("Failed to create AD");
    }
});

const searchProducts = asyncHandler(async (req,res) => {
    const keyword = req.query.search?{
        $or: [
            {kind: {$regex: req.query.search, $options: "i"}},
            {name: {$regex: req.query.search, $options: "i"}},
            {description: {$regex: req.query.search, $options: "i"}},
        ]
    }
    : {};

    const products = await Product.find(keyword).find();
    res.send(products);
})

const allProducts = asyncHandler(async (req,res) => {
    Product.find((err,val) => {
        if(err){
            console.log(err)
        }else{
            res.json(val);
        }
    })
})

const singleProductDetails = asyncHandler(async (req,res) => {
    const productDetails = await Product.findById(req.params.productId);
    res.send(productDetails);
})


module.exports = {registerProduct, searchProducts, allProducts, singleProductDetails};