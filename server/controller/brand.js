const Brand = require('../models/brand');


const addBrand = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Please provide title" });

    const Brand = await Brand.create({ title });

    return res.status(201).json({
        status: 'success',
        res: Brand,
    });
};

const getBrand = async (req, res) => {
    const brand = await Brand.find();
    return res.status(200).json({
        status: 'success',
        res: brand,
    });
};

const updateBrand = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Please provide title" });
    const Brand = await Brand.findByIdAndUpdate(req.params._brandId, { title }, { new: true });
    return res.status(200).json({
        status: 'success',
        res: Brand,
    });
};

const deleteBrand = async (req, res) => {
    const Brand = await Brand.findByIdAndDelete(req.params._brandId);
    return res.status(200).json({
        status: 'success',
        res: Brand,
    });
};


module.exports = {
    addBrand,
    getBrand,
    updateBrand,
    deleteBrand

};