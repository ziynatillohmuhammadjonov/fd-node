import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import * as Joi from 'joi'
import config from 'config'

interface iUser {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
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
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, { versionKey: false })
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model("User", userSchema)
function validateUser(body: iUser) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    })
    return schema.validate(body)
}

exports.User = User
exports.validate = validateUser