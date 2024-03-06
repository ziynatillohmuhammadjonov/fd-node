// package
import mongoose from "mongoose";
import express, { Request, Response, Router } from "express";

// models
const { validate, Category } = require('../models/category')

// middleware
import  auth  from '../middleware/auth';
import admin from "../middleware/admin";

const router: Router = express.Router()
// get all categories
router.get('/', async (req: Request, res: Response) => {
    const categories = await Category.find()
    res.send(categories)
})

// add new categories 
router.post('/',auth, async (req: Request, res: Response) => {
    try {
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message);
        const category = new Category({
            name: req.body.name
        })
        const saveCategory = await category.save()
        res.send(saveCategory)
        
    } catch (error) {
        return console.log(error)
    }
})

// get category byId
router.get('/:id', async (req: Request, res: Response) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).send("Id formati to'g'ri emas :(..")
        }
        const category = await Category.findById(req.params.id)
        if (!category) return res.status(400).send("Id bazadan topilmadi... :(")
        res.send(category)
    } catch (err) {
        return
    }
})

// update category 
router.put('/:id',auth, async(req:Request, res:Response)=>{
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(404).send("Id formati to'g'ri emas :(..")
        }
        const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
            new: true
          });
        if (!category) return res.status(404).send("Id bazadan topilmadi... :(")
        res.send(category)
    } catch (err) {
        return
    }
})

// delete category
router.delete('/:id', [auth, admin] , async(req:Request, res:Response)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("Noto'gri formatdagi id :(")
        const category = await Category.deleteOne({_id:req.params.id})
        if(!category||!category.deletedCount) return res.status(404).send("Mavjud bo'lmagan id yuboringiz... :(")
        if(category.deletedCount){
            return res.send("Ma'lumot muvaffaqiyatli o'chirildi. :)")
        }
        res.send(category)
    }
    catch(err){
        return
    }
})
module.exports = router