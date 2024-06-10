const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');

const {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
} =  require('../controller/category');

router.post('/add', addCategory);
router.get('/get', getCategories);
router.put('/update/:_id', updateCategory);
router.delete('/delete/:_id', deleteCategory);


module.exports = router;