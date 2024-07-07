const slugify = require('slugify')
const Product = require('../models/product');

const addProduct = async (req,res) => {
    const { title, brand, description, price } = req.body;
    if (!title || !brand || !description || !price) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    req.body.slug = slugify(title);
    const response = await Product.create(req.body);
    return res.status(200).json({
        status: 'success',
        res: response,   
    });
};

//filtering products
const getProducts = async (req, res) => {
    const queryObj = { ...req.query };
    console.log(queryObj);
     //lấy tất cả các query từ url
    //format lại các operator trong query
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    //format lại các operator trong query
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/gi, match => `$${match}`);
    const formattedQuery = JSON.parse(queryStr);

    //format lại title
    if (queryObj?.title) {
        formattedQuery.title = { $regex:`.*${queryObj.title}`, $options: 'i' };
    }
    if (queryObj?.category) {
        formattedQuery.category = { $regex: `.*${queryObj.category}`, $options: 'i' };
    }
    if (queryObj?.color) {
        const colors = Array.isArray(queryObj.color) ? queryObj.color : queryObj.color.split(',');
        formattedQuery.color = {
            $elemMatch: {
                label: { $in: colors }
            }
        };
        console.log(formattedQuery);
    }
    //excecute query
    let queryCommand = Product.find(formattedQuery);
    

    //sorting
    const sortBy = req.query.sort;
    if (sortBy) {
        const sortByArr = sortBy.split(',').join(' ');
        queryCommand = queryCommand.sort(sortByArr);
    }
    //limiting fields
    const fields = req.query.fields;
    if (fields) {
        const fieldsArr = fields.split(',').join(' ');
        queryCommand = queryCommand.select(fieldsArr);
    }

    //pagination
    if (req.query.page || req.query.limit) {
        const page = +req.query.page || 1;   
        const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
        const skip = (page - 1) * limit;
        queryCommand = queryCommand.skip(skip).limit(limit);
    }
   
    
    try {
        const data = await queryCommand.exec();
        console.log('data', data.length);
        return res.status(200).json({
            status: 'success',
            res: data,
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

const getProductBySlug = async (req, res) => {
    const { slug } = req.params;
    if(!slug) return res.status(400).json({ message: "Please provide product slug" });

    const product = await Product.findOne({ slug });
    return res.status(200).json({
        status: 'success',
        res: product,
    });
};

const getProductByID = async (req, res) => {
    const { _id } = req.params;
    if(!_id) return res.status(400).json({ message: "Please provide product ID" });

    const product = await Product.findById({ _id }).populate("rating.postedBy", "firstName lastName");
    return res.status(200).json({
        status: 'success',
        res: product,
    });
};

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({
        status: 'success',
        res: products,
    });

}

const updateProduct = async (req, res) => {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ message: "Please provide product ID" });

    const product = await Product.findByIdAndUpdate(_id, req.body, { new: true });

    return res.status(200).json({
        status: 'success',
        res: product,
    });
}

const deleteProduct = async (req, res) => {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ message: "Please provide product ID" });

    const product = await Product.findByIdAndDelete(_id);

    return res.status(200).json({
        status: 'success',
        res: product,
    });
}

const ratingProduct = async (req, res) => {
    const { _id } = req.user;
    if (!_id) return res.status(400).json({ message: "Please provide product ID" });

    
    const { star, comment , pid } = req.body;
    if (!star || !comment || !pid) return res.status(400).json({ message: "Please provide star, comment and product ID" });


    console.log( star, comment , pid ,_id);
    
    const product = await Product.findById(pid);
    if (!product) return res.status(400).json({ message: "Product not found" });

    const alreadyRated = product.rating.find(r => r.postedBy.toString() === _id.toString());
    if (alreadyRated) {
        console.log('updated', req.body);
        const product = await Product.findOneAndUpdate({
            _id: pid,
            rating: {$elemMatch: {postedBy: _id}}
        }, {
            $set: {
                "rating.$.star": star,
                "rating.$.comment": comment
            }
        }, {new: true });
    
 
    }
    else {
        const response = await Product.findByIdAndUpdate(pid, {
            $push: {
                rating: {
                    star,
                    comment,
                    postedBy: _id,
                }
            }
        }, { new: true });
       
    }

    const updatedProduct = await Product.findById(pid);
    let totalRating = 0;
    const ratingLength = updatedProduct.rating.length;
    updatedProduct.rating.map(r => totalRating += r.star);
    const avgRating = parseFloat((totalRating / ratingLength).toFixed(1));

    const updateRating = await updatedProduct.updateOne({ totalRating: avgRating });

    return res.status(200).json({
        status: 'success',
        updateRating
    });
}   

const uploadImage = async (req, res) => {
    const { pid } = req.params;
    console.log('uploading image', req.file);

    if (!req.file) return res.status(400).json({ message: "Please provide image" });
    const product = await Product.findById(pid);
    if (!product) return res.status(400).json({ message: "Product not found" });
    const response = await Product.findByIdAndUpdate(pid, {$push: {image: req.file.path}}, { new: true });
    return res.status(200).json({
        status: 'success',
        res: response,
    });

}
module.exports = {
    addProduct,
    getProducts,
    getProductBySlug,
    getProductByID,
    updateProduct,
    deleteProduct,
    ratingProduct,
    uploadImage,
    getAllProducts
};