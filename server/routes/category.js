const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');
const {insertCategory} = require('../controller/insertCategories');

const {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory,

} =  require('../controller/category');

router.post('/add', addCategory);
router.get('/get', getCategories);
router.put('/update/:_id', updateCategory);
router.delete('/delete/:_id', deleteCategory);

//insertCategory
router.post('/insertCategory', insertCategory);


module.exports = router;