import mongoose from "mongoose";
import * as Joi from 'joi'

interface iUser{
    name:string,
    email:string,
    password:string
}
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }

},{versionKey: false})
const User = mongoose.model("User",userSchema)
function validateUser (body:iUser){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(body)
}

exports.User = User
exports.validate = validateUser