import mongoose from "mongoose";
import * as Joi from 'joi';
const { categorySchema } = require('./category')

 interface iCourse {
    title: string,
    category: mongoose.Types.ObjectId,
    trainer: string,
    tags: string[],
    status: 'Active' | 'Inactive',
    fee: number,
    categoryId:mongoose.Types.ObjectId
}

const courseSchema = new mongoose.Schema<iCourse>({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
      category: {
        type: categorySchema,
        required: true
      },
      trainer: {
        type: String,
        required: true
      },
      tags: {
        type: [String]
      },
      status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true
      },
      fee: {
        type: Number,
        required: true
      }
},{versionKey: false})
function validateCourse (body:iCourse){
    const validateJoi = Joi.object<iCourse>({
        title: Joi.string().min(5).max(255).required(),
        categoryId: Joi.string().required(),
        trainer: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
        status:Joi.string().required(),
        fee:Joi.number().required()
    })
    return validateJoi.validate(body)
}
const Course = mongoose.model('Course', courseSchema)

exports.Course = Course
exports.validate = validateCourse
exports.courseSchema = courseSchema