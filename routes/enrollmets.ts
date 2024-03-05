import express, { Request, Response, Router } from "express";
import mongoose from "mongoose";
const { Enrollment, validate } = require('../models/enrollment')
const { Customer } = require('../models/customer')
const { Course } = require('../models/course')
const {Journal}=require('../models/jounal')

const router: Router = express.Router()

// get all enrollments
router.get('/', async (req: Request, res: Response) => {
    const enrollments = await Enrollment.find().sort('dateStart')
    res.send(enrollments)
})

// add new enrollments
router.post('/', async (req: Request, res: Response) => {
    const session = await mongoose.startSession()
    session.startTransaction
    try {
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        if (!mongoose.Types.ObjectId.isValid(req.body.customerId) || !mongoose.Types.ObjectId.isValid(req.body.courseId)) return res.status(400).send("Noto'g'ri formtdagi id")

        const customers = await Customer.findById(req.body.customerId)
        if (!customers) return res.status(404).send("Bunday foydalanuvchi bazadan topilmadi...:(")

        const courses = await Course.findById(req.body.courseId)
        if (!courses) return res.status(404).send("Bunday kurs bazadan topilmadi...:(")

        const enrollment = new Enrollment({
            customer: {
                _id: customers._id,
                name: customers.name
            },
            course: {
                _id: courses._id,
                title: courses.title

            },
            courseFee: req.body.courseFee
        })

        // bu jarayonni tranzaksiyada qilish kerak.
        if (customers.isVip) { 
            if(customers.bonusPoints<=3){
                const journal = new Journal({
                    customerName: customers.name,
                    courseTitle: courses.title
                })
                journal.save()
                return enrollment.courseFee = courses.fee - (0.2 * courses.fee) 

            }else{
                throw new Error("Mijoz limitidan foydalanib bo'lgan")
            }
        } //mijozlarga 20 % chegirma

        const saveEnrollment = await enrollment.save()
        customers.bonusPoints++
        customers.save()
        res.send(saveEnrollment)
    } catch (err) {
        await session.abortTransaction()
        console.log(err);
        throw err
    } finally {
        session.endSession()
    }
})

// get byId
router.get('/:id', async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("Noto'g'ri formatdagi so'rov ... :(")
        const enrollment = await Enrollment.findById(req.params.id)
        if (!enrollment) return res.status(404).send("Bunday xodisa topilmadi ... :(")
        res.send(enrollment)
    } catch (err) {
        return console.log(err);

    }
})

// update metodi bo'lmaydi

// delete
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("Noto'g'ri formatdagi so'rov ... :(")

    } catch (err) {
        return console.log(err);

    }
})
module.exports = router