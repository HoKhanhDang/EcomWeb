const Category = require('../models/category');
const data = require('../data/categories.json');
const slugify = require('slugify');

const insertCategory = async (req, res) => {
    
    data.forEach(async (product) => {
        await Category.create({
            title: product.name,
            slug: slugify(product.name),
            brand: product.nameCompany,
            image: product.image,
           
        });
    });
    console.log(data);

    return res.status(200).json({ 
        message: "Products inserted successfully", 
    });
}

module.exports = {insertCategory};