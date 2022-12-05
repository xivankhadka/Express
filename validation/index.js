const { check, validationResult } = require('express-validator')

exports.categoryVaildationRules = [
    check('category_name', 'Category name is reqired').notEmpty()
        .isLength({ min: 3 }).withMessage('Category name must be at least 3 character')

]

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next()
}

exports.productVaildationRules = [
    check('product_name', 'Product name is require').notEmpty()
        .isLength({ min: 3 }).withMessage("Product name must be at least 3 character"),

    check('product_price', 'Product price is reqired').notEmpty()
        .isNumeric().withMessage("price must be a number"),

    check('product_description', 'Product description is reqired').notEmpty()
        .isLength({ min: 20 }).withMessage("Description must be at least 20 characters"),

    check('category', 'Category is reqired').notEmpty(),

    check('count_in_stock', 'count in stock is reqired').notEmpty()
        .isNumeric().withMessage("Count must be a number")

]
