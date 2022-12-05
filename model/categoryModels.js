const mongoose = require('mongoose')

const categoryModelSchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

// timestamp - createATt, updateAt
// _id -auto by mongoDB

module.exports = mongoose.model('Category', categoryModelSchema)