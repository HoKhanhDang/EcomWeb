const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');

const {
    addBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog,
    getBlog
} =  require('../controller/blog');

router.post('/add', addBlog);
router.get('/getBlogs', getBlogs);
router.put('/update/:_id', updateBlog);
router.delete('/delete/:_id', deleteBlog);
router.put('/like',verifyToken, likeBlog);
router.put('/dislike',verifyToken, dislikeBlog);
router.put('/get/:bid', getBlog);


module.exports = router;