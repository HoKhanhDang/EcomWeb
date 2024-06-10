const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');

const {
    addBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory
} =  require('../controller/blogCategory');

router.post('/add', addBlogCategory);
router.get('/get', getBlogCategory);
router.put('/update/:_id', updateBlogCategory);
router.delete('/delete/:_id', deleteBlogCategory);


module.exports = router;