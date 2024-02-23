import express, { Request, Response, Router } from 'express'
import mongoose from 'mongoose'
import * as Joi from 'joi'

const router: Router = express.Router()

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

// get All Customer 
router.get('/', async (req: Request, res: Response) => {
    const customers = await Customer.find().sort({ name: 1 })
    res.send(customers)
})

// get Customer by id
router.get('/:id', async (req: Request, res: Response) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).send("Mavjub bo'lmagan id....")
    res.send(customer)
})

// post Customer
router.post('/', async (req: Request, res: Response) => {
    const { error } = validateCustomer(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const user = await Customer.create(req.body)
    const saveUser = await user.save()
    res.send(saveUser)
})

// update Customer
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const customer = await Customer.updateOne({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                isVip: req.body.isVip,
                phone: req.body.phone
            }
        })

        res.send(customer)

    } catch (err) {
        console.log(err);
        return 
    }

})

// delete Customer

router.delete('/:id',async(req:Request, res:Response)=>{
    try{
        const customer = await Customer.findByIdAndDelete(req.params.id)
        res.send(customer)

    }catch(err){
        console.log(err);
        return 
    }
})
module.exports = router