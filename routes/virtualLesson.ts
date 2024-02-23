import mongoose, { ObjectId } from 'mongoose'
import express, { Request, Response, Router}  from 'express'
import * as Joi from 'joi'
const router:Router = express()


interface iCategories {
    name: string
}

// const categories:iCategories[] = [
//     {
//         name: 'Dasturlash',
//     },
//     {
//         name: "DevOps"
//     },
//     {
//         name: "QA Testing"

//     }

// ]

const categorieSchema =new mongoose.Schema<iCategories>({
    name:{type:String, required:true}
    
})

const Categorie = mongoose.model('Categorie', categorieSchema)


function validateCategories(categorie:string){
    const categorieSchema = Joi.object({
        name: Joi.string().required().min(5).max(30)
    })
    return  categorieSchema.validate(categorie)
}
// router.get('/',(req:Request, res:Response)=>{
//     res.send('Kategoriyalar')
// })

// get all categories
router.get('/', async (req:Request, res:Response) => {
    const categoriyalar = await Categorie.find()
    res.send(categoriyalar)
})

// get ById
router.get('/:id', async(req:Request, res:Response)=>{
    const categorie = await Categorie.findById(req.params.id)
    if (!categorie) return res.status(404).send("Mavjud bo'lmagan id...")
    res.send(categorie)
})

// add new categorie
router.post('/', async (req:Request, res:Response)=>{
    const result = validateCategories(req.body)
    if(result.error){
        return res.status(400).send(result.error.details[0].message)
    }

    const categ = new Categorie({
        name: req.body.name
    })
        const saveCateg = await categ.save()
    res.status(201).send(saveCateg)
})

// update category
router.put('/:id', async(req:Request, res:Response)=>{
    const categorie = await Categorie.findById(req.params.id)
    if(!categorie)return res.status(404).send('Mavjud bomagan id...')

    const {error} = validateCategories(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    categorie.set({
        name: req.body.name
    })
    const saveCategorie = await categorie.save()
    res.send(saveCategorie)

})

// // delete category
router.delete('/:id',async(req:Request, res:Response)=>{
    const categorie = await Categorie.findByIdAndDelete(req.params.id)
    if(!categorie)return res.status(404).send('Mavjud bomagan id...')
    const deleteCategorie = await categorie.deleteOne()
    res.send(deleteCategorie)
})
module.exports =router