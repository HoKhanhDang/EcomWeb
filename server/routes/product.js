const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');
const uploadCloud = require('../config/cloudinary.config');

const {
    addProduct,
    getProducts,
    getProductBySlug,
    getProductByID,
    updateProduct,
    deleteProduct,
    ratingProduct,
    uploadImage
} =  require('../controller/product');

const {insertProduct} = require('../controller/insertProduct');

router.post('/addProduct', addProduct);
router.get('/getProducts', getProducts);
router.get('/getProductBySlug/:_id', getProductBySlug);
router.get('/getProductByID/:_id', getProductByID);
router.put('/updateProduct/:_id', updateProduct);
router.delete('/deleteProduct/:_id', deleteProduct);
router.put('/ratingProduct', verifyToken, ratingProduct);
router.put('/uploadImage/:pid', uploadCloud.array('image'), uploadImage)

router.post('/insertProduct', insertProduct);

module.exports = router;