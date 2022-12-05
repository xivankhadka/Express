const Category = require('../model/categoryModels')

// add category

exports.postCategory = async (req, res) => {
    let category = await Category.findOne({ category_name: req.body.category_name })
    if (!category) {
        let categoryToAdd = new Category({
            category_name: req.body.category_name
        })
        categoryToAdd = await categoryToAdd.save()
        if (!categoryToAdd) {
            return res.status(400).json({ error: "Somthing Went Wrong." })
        }
        res.send(categoryToAdd)
    }
    else {
        return res.status(400).json({ error: "category already exists." })
    }

}
// req.body -> to get data form user through forms
// req.params -> to get data from user throung url
// req.query -> to get data form user through url,using variables

//  res.status(code).json ({}) -> to pass message to user
// res.send(pnj) -> to pass object to user

// modle.find() -> returns all data in arry=ay
// model.find(filter) -> reutrna all data that satisfies filter object in array
// Model.findOne(filter) -> returns single data that satisfies filter object
// model.findById(id) -> returns single data with given id
// model.findByandUpdate(id,{}) ->update singel data with  given id, update value -{}
// model.findByandRemove(id) ->delets single data with given id
// model.findByandDelete(id) ->delete single data with given id

// to get all categories
exports.getAllCategories = async (req, res) => {
    let categories = await Category.find()
    if (!categories) {
        return res.status(400).json({ error: "Something Went wrong." })
    }
    res.send(categories)
}


// to get categories details
exports.getCategory = async (req, res) => {
    let category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(400).json({ error: "Something Went wrong." })
    }
    res.send(category)
}
//to update category
exports.updateCategory = async (req, res) => {
    let categoryToUpdate = await Category.findByIdAndUpdate(req.params.id, {
        category_name: req.body.category_name
    }, { new: true })
    if (!categoryToUpdate) {
        return res.status(400).json({ error: "Something Went wrong." })
    }
    res.send(categoryToUpdate)
}
//to delete category
exports.deleteCategory = async (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(category => {
            if (!category) {
                return res.status(400).json({ error: "Category not found." })
            }
            return res.status(200).json({ message: "Category delete successfully" })
        })
        .catch(error => {
            return res.status(400).json({ error: error.message })
        })
}