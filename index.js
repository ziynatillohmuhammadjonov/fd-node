const express = require('express')
const app = express()
const Joi = require('joi')
app.use(express.json())

const books = [
    {id:1, name:'rich dad poor dad'},
    {id:2, name:'Nextjs Real World'},
    {id:3, name:'TypeScript news'},

]
const bookSchema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    id: Joi.number()
})

app.get('/',(req, res)=>{
    res.send('Salom...')
})

app.get('/api/books',(req, res)=>{
    // res.send(['rich dad poor dad', 'algorithm', 'Nextjs Real World', 'TypeScript news'])
    res.send(books)
})

app.get('/api/books/:id',(req, res)=>{
    const book = books.find(b=>b.id === parseInt(req.params.id))
    if(!book){
        res.status(404).send('Berilgan id ga teng kitob topilmadi.')
    }
    res.send(book)
})

app.post('/api/books', (req,res)=>{

    const book = {
        id: books.length +1,
        name: req.body.name
    }
    const result = bookSchema.validate(book)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }else{
        books.push(book)
        res.status(201).send(book)
    }
})

app.get('/api/articles/:year/:month',(req, res)=>{
    res.send( req.query)

})


const port = 5000
app.listen(port, ()=>{
    console.log(`${port} portni eshitishni boshladim...`)
})