const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler')


const addBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content ) return res.status(400).json({ message: "Please provide all fields" });

    const blog = await Blog.create(req.body);

    return res.status(201).json({
        status: 'success',
        res: blog,
    });

});

const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find();
    return res.status(200).json({
        status: 'success',
        res: blogs,
    });
});


const updateBlog = asyncHandler(async (req, res) => {
    const { title, content, category, bid } = req.body;
    if (!title || !content || !category) return res.status(400).json({ message: "Please provide all fields" });

    const blog = await Blog.findByIdAndUpdate(req.bid, { title, content, category }, { new: true });
    return res.status(200).json({
        status: 'success',
        res: blog,
    });
});

const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params._id);
    return res.status(200).json({
        status: 'success',
        res: blog,
    });
});

const likeBlog = asyncHandler(async (req, res) => {
    
    const {_id} = req.user;
    const {bid} = req.body;

    const blog = await Blog.findById(bid);
    if(!blog) return res.status(404).json({message: "Blog not found"});

    const isDislike = blog?.dislikes?.find((el) =>el.toString() === _id);

    if (isDislike){
        const response= await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}, $push: {likes: _id}}, {new: true});
        return res.status(200).json({
            status: 'success',
            res: response,
        });
    }

    const isLiked = blog?.likes?.find((el) =>el.toString() === _id);

    if (isLiked){
        const response= await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true});

        return res.status(200).json({
            status: 'success',
            res: response,
        });
    }
    else{
        const response= await Blog.findByIdAndUpdate(bid, {$push: {likes: _id}}, {new: true});
        return res.status(200).json({
            status: 'success',
            res: response,
        });
    }
});

const dislikeBlog = asyncHandler(async (req, res, next) => {
    const {_id} = req.user;
    const {bid} = req.body;

    const blog = await Blog.findById(bid);
    if(!blog) return res.status(404).json({message: "Blog not found"});

    const isDislike = blog?.dislikes?.find((el) =>el.toString() === _id);

    if (!isDislike){
        const response= await Blog.findByIdAndUpdate(bid, {$push: {dislikes: _id}}, {new: true});
        return res.status(200).json({
            status: 'success',
            res: response,
        });
    }
    else{
        const response= await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true});
        return res.status(200).json({
            status: 'success',
            res: response,
        });
    
    }
});

const getBlog = asyncHandler(async (req, res) => {
    const {bid} = req.params;
    const blog = await Blog.findById(bid)
        .populate('likes','firstName lastName ')
        .populate('dislikes','firstName lastName')
        .populate('author','firstName lastName');
    
    return res.status(200).json({
        status: 'success',
        res: blog,
    });
});

module.exports = {
    addBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog,
    getBlog
}