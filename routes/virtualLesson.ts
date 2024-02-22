import express, {Express, Request, Response, Router}  from 'express'
import * as Joi from 'joi'
const router:Router = express()

interface iCategories {
    id: number, 
    name: string
}

const categories:iCategories[] = [
    {
        id: 1,
        name: 'Dasturlash',
    },
    {
        id: 2,
        name: "DevOps"
    },
    {
        id: 3,
        name: "QA Testing"

    }

]

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
router.get('/', (req:Request, res:Response) => {
    res.send(categories)
})

// add new categorie
router.post('/', (req:Request, res:Response)=>{
    // console.log(req);
    const result = validateCategories(req.body)
    console.log(result);
    if(result.error){
        return res.send(result.error.details[0].message)
    }
    const categorie = {
        id: categories.length+1,
        name: req.body.name
    }
    categories.push(categorie)
    res.status(201).send(categorie)
})


router.put('/:id', (req:Request, res:Response)=>{
    const categorie = categories.find(ct=>ct.id===parseInt(req.params.id))
    if(!categorie)return res.status(404).send('Mavjud bomagan id...')

    const {error} = validateCategories(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    categorie.name=req.body.name
    res.send(categorie)

})

// delete category
router.delete('/:id',(req:Request, res:Response)=>{
    const categorie = categories.find(ct=>ct.id===parseInt(req.params.id))
    if(!categorie)return res.status(404).send('Mavjud bomagan id...')

    const index = categories.indexOf(categorie)
    categories.splice(index,1)
    res.send(categorie)
})
module.exports =router