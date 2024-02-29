import mongoose from "mongoose";
import * as Joi from 'joi'

interface iCustomer {
    name: string,
    isVip: boolean,
    phone: string,
    bonusPoints: number
}

const customerSchema = new mongoose.Schema<iCustomer>({
    name: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    bonusPoints: {
        type: Number,
        default: 0
    }
}, { versionKey: false })
function validaCustomer(body: iCustomer) {
    const validaCustomers = Joi.object<iCustomer>({
        name: Joi.string().min(3).max(30).required(),
        isVip: Joi.boolean().default(true).required(),
        phone: Joi.string().min(5).max(50).required(),
        bonusPoints: Joi.boolean()
    })
    return validaCustomers.validate(body)
}
const Customer = mongoose.model("Customer", customerSchema)

exports.customerSchema = customerSchema
exports.validate = validaCustomer
exports.Customer = Customer