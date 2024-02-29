import mongoose from 'mongoose'
import express, { Router, Request, Response } from 'express'
const { Course, validate, iCourse } = require('../models/course')
const { Category } = require('../models/category')
const router: Router = express.Router()

// get all course
router.get('/', async (req: Request, res: Response) => {
    const courses = await Course.find().sort('title')
    res.send(courses)
})

// add courses
router.post('/', async (req: Request, res: Response) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const category = await Category.findById(req.body.categoryId)
    if (!category) return res.status(400).send('Berilgan IDga teng bo\'lgan toifa topilmadi.');

    const course = new Course({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        trainer: req.body.trainer,
        tags: req.body.tags,
        status: req.body.status,
        fee: req.body.fee
    })
    const saveCourse = await course.save()
    res.send(saveCourse)
})
// get byId
router.get('/:id', async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('Notogri formatdagi id. :(')
        const course = await Course.findById(req.params.id)
        if (!course) return res.status(400).send("Berilgan Id kurs topilmadi. :(")
        res.send(course)
    }
    catch (err) {
        return console.log(err);

    }
})

// update course
router.put('/:id', async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id) || !mongoose.Types.ObjectId.isValid(req.body.categoryId)) return res.status(400).send('Notogri formatdagi id. :(')
        const category = await Category.findById(req.body.categoryId)
        if (!category) return res.status(400).send("Bunday turkum topilmadi. :(")

        const course = await Course.updateOne({_id: req.params.id},{
            title: req.body.title,
            category: {
                _id: category._id,
                name: category.name
            },
            trainer: req.body.trainer,
            tags: req.body.tags,
            status: req.body.status,
            fee: req.body.fee
        })
        if (!course) return res.status(400).send("Berilgan kurs topilmadi. :(")
        res.send(course)
    }
    catch (err) {
        return console.log(err);

    }
})

// delete  course
router.delete('/:id', async(req:Request, res:Response)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send("Berilgan id topilmadi :(")
        const deleteCourse = await Course.deleteOne({_id:req.params.id})
        if(!deleteCourse.deletedCount) return res.status(404).send("Berilgan kurs topilmadi :(")
        res.send("Kurs muvafaqiyatli o'chirildi...:)")
    }catch(err){
        return console.log(err);
        
    }
})

module.exports = router