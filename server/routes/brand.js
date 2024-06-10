const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');

const {
    addBrand,
    getBrand,
    updateBrand,
    deleteBrand
} =  require('../controller/brand');

router.post('/add', addBrand);
router.get('/get', getBrand);
router.put('/update/:title', updateBrand);
router.delete('/delete/:title', deleteBrand);


module.exports = router;