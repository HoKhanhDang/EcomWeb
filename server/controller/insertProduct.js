const Product = require('../models/product');
const data = require('../data/data.json');
const slugify = require('slugify');

const insertProduct = async (req, res) => {
    
    data.forEach(async (product) => {
        await Product.create({
            title: product.title,
            slug: slugify(product.title),
            description: product.description,
            price: parseFloat(product.price.replace('$', '')),
            category: product.category,
            brand: product.brand,
            image: product.image,
            quantity: Math.round(Math.random() * 100),
            color: product.color,
        });
    });

    return res.status(200).json({ 
        message: "Products inserted successfully", 
    });
}

module.exports = {insertProduct};