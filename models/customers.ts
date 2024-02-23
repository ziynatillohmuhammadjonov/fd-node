import mongoose from 'mongoose'
import * as Joi from 'joi'

interface iCustomer {
    name: string,
    isVip: boolean,
    phone: string
}
function validateCustomer(user: iCustomer) {
    const validateCustomers = Joi.object<iCustomer>({
        name: Joi.string().min(3).max(15),
        isVip: Joi.boolean(),
        phone: Joi.string()
    })
    return validateCustomers.validate(user)
}
const customerSchema = new mongoose.Schema<iCustomer>({
    name: { type: String, required: true },
    isVip: { type: Boolean, required: true },
    phone: { type: String, required: true }
})
const Customer = mongoose.model("Customer", customerSchema)
exports.Customer =Customer
exports.validate = validateCustomer