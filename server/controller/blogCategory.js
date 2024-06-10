const BlogCategoryCategory = require('../models/blogCategory');

const addBlogCategory = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Please provide category title" });

    const blogCategory = await BlogCategoryCategory.create({ title });

    return res.status(201).json({
        status: 'success',
        res: blogCategory,
    });
};

const getBlogCategory = async (req, res) => {
    const blogcategories = await BlogCategoryCategory.find();
    return res.status(200).json({
        status: 'success',
        res: blogcategories,
    });
};

const updateBlogCategory = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Please provide category title" });
    console.log('im here');
    const blogCategory = await BlogCategoryCategory.findByIdAndUpdate(req.params._id, { title }, { new: true });
    return res.status(200).json({
        status: 'success',
        res: blogCategory,
    });
};

const deleteBlogCategory = async (req, res) => {
    const blogCategory = await BlogCategoryCategory.findByIdAndDelete(req.params._id);
    return res.status(200).json({
        status: 'success',
        res: blogCategory,
    });
};


module.exports = {
    addBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory

};