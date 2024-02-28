import mongoose from "mongoose";
import * as Joi from 'joi'

interface iCategory {
    name: string
}
const categorySchema = new mongoose.Schema<iCategory>({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
})
const Category = mongoose.model('Category', categorySchema)

function validate (body:string){
    const validateCategory = Joi.object({
        name:Joi.string().min(3).max(50).required()
    })
    return validateCategory.validate(body)
}

exports.validate = validate
exports.Category = Category
exports.categorySchema = categorySchema