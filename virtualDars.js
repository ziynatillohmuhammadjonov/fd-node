const express = require('express')
const Joi = require('joi')
const app = express()
app.use(express.json())//Agar bu bo'lmasa body ichidagi ma'lumotlarni olib kelib bo'lmaydi ekan

const categories = [
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

function validateCategories(categorie){
    const categorieSchema = Joi.object({
        name: Joi.string().required().min(5).max(30)
    })
    return result = categorieSchema.validate(categorie)
}
app.get('/',(req,res)=>{
    res.send('Kategoriyalar')
})

// get all categories
app.get('/api/categories', (req, res) => {
    res.send(categories)
})

// add new categorie
app.post('/api/categories', (req,res)=>{
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


app.put('/api/categories/:id', (req, res)=>{
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
app.delete('/api/categories/:id',(req, res)=>{
    const categorie = categories.find(ct=>ct.id===parseInt(req.params.id))
    if(!categorie)return res.status(404).send('Mavjud bomagan id...')

    const index = categories.indexOf(categorie)
    categories.splice(index,1)
    res.send(categorie)
})

app.listen(5001,()=>{
    console.log('5001 - portni eshitishini boshladim...');
})