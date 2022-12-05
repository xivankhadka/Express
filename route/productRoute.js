const express = require('express')
const { addProduct, getAllProducts, getProductsByCategory, updateProduct } = require('../controller/ProductController')
const { requireSignin } = require('../controller/userController')
const upload = require('../uitls/fileupload')
const { productVaildationRules, validate } = require('../validation')
const router = express.Router()

router.post('/addproduct', upload.single('product_image'), productVaildationRules, validate, requireSignin, addProduct)
router.get('/getallproducts', getAllProducts)
router.get('/productdetails/:id', getAllProducts)
router.get('/productsbycategory/:category_id', getProductsByCategory)
router.put('/updateproduct/:id', requireSignin, updateProduct)

module.exports = router