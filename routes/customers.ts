import express, { Router, Response, Request } from 'express'
import mongoose from 'mongoose'
import auth from '../middleware/auth'
const { validate, Customer } = require('../models/customer')
const router: Router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const customers = await Customer.find().sort('name')
    res.send(customers)
})

// add customers
router.post('/',auth, async (req: Request, res: Response) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const customer = new Customer({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone,
        bonusPoints: req.body.bonusPoints
    })
    const saveCustomer = await customer.save()
    res.send(saveCustomer)
})
// get ById 
router.get('/:id', async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("Id noto'g'ri formatda... :(")
        const customer = await Customer.findById(req.params.id)
        if (!customer) return res.status(400).send("Mavjud bo'lmagan id. :(")
        res.send(customer)
    } catch (err) {
        return console.log(err);

    }
})
// update Customer
router.put('/:id',auth, async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("Id noto'g'ri formatda... :(")
        const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
        const customer = await Customer.findByIdAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            isVip: req.body.isVip,
            phone: req.body.phone,
            bonusPoints: req.body.bonusPoints
        })
        if (!customer) return res.status(400).send("Mavjud bo'lmagan id. :(")

        res.send(customer)
    } catch (err) {
        return console.log(err);

    }
})
// delete customer
router.delete('/:id',auth, async(req:Request, res:Response)=>{
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("Id noto'g'ri formatda... :(")
           const customer = await Customer.deleteOne({ _id: req.params.id })
        if (!customer) return res.status(400).send("Mavjud bo'lmagan id. :(")

        res.send(customer)
    } catch (err) {
        return console.log(err);

    }
})
module.exports = router