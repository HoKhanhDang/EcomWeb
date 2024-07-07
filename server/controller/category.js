const Category = require('../models/category');

const addCategory = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Please provide category title" });

    const category = await Category.create(req.body);

    return res.status(201).json({
        status: 'success',
        res: category,
    });
};

const getCategories = async (req, res) => {
    const categories = await Category.find();
    return res.status(200).json({
        status: 'success',
        res: categories,
    });
};

const updateCategory = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Please provide category title" });
    console.log('im here');
    const category = await Category.findByIdAndUpdate(req.params._id, { title }, { new: true });
    return res.status(200).json({
        status: 'success',
        res: category,
    });
};

const deleteCategory = async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params._id);
    return res.status(200).json({
        status: 'success',
        res: category,
    });
};


module.exports = {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory

};