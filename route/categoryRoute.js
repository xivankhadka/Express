const express = require('express')
const { postCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require('../controller/categorycontroller')
const { requireSignin } = require('../controller/userController')
const { categoryVaildationRules, validate } = require('../validation')
const router = express.Router()



router.post('/addcategory', categoryVaildationRules, validate, requireSignin, postCategory)
router.get('/getallcategories', getAllCategories)
router.get('/categorydetails/:id', getCategory)
router.put('/updatecategory/:id', requireSignin, updateCategory)
router.delete('/deletecategory/:id', requireSignin, deleteCategory)

module.exports = router