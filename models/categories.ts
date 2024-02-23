import mongoose from 'mongoose'
import * as Joi from 'joi'


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

exports.Categorie = Categorie
exports.validate = validateCategories