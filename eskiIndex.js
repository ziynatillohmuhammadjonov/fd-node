const express = require('express')
const app = express()
const Joi = require('joi')
// app.use(express.json())

const books = [
    { id: 1, name: 'rich dad poor dad' },
    { id: 2, name: 'Nextjs Real World' },
    { id: 3, name: 'TypeScript news' },

]

// book validatsiya
function validateBook (bookName){
    const bookSchema = Joi.object({
        name: Joi.string().required().min(3).max(50),
    })
    return result = bookSchema.validate(bookName)
}


app.get('/', (req, res) => {
    res.send('Salom...')
})

app.get('/api/books', (req, res) => {
    // res.send(['rich dad poor dad', 'algorithm', 'Nextjs Real World', 'TypeScript news'])
    res.send(books)
})

app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (!book) {
       return res.status(404).send('Berilgan id ga teng kitob topilmadi.')
    }
    res.send(book)
})

app.get('/api/articles/:year/:month', (req, res) => {
    res.send(req.query)

})


// post request
app.post('/api/books', (req, res) => {

    const book = {
        id: books.length + 1,
        name: req.body.name
    }

    const { error } = validateBook(req.body)
    if (error) {
       return res.status(400).send(error.details[0].message)
    } else {
        books.push(book)
        res.status(201).send(book)
    }
})


// put request
app.put('/api/books/:id', (req, res) => {
    // kitobni bazadan izlab topish agar bo'lmasa 404 qaytarish
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (!book) {
       return res.status(404).send('Berilgan id ga teng kitob topilmadi.')
    }

    // agar kitob topilsa so'rovni validatsiya qilish.
   
    const { error } = validateBook(req.body)
    if (error) {
       return res.status(400).send(error.details[0].message)
    } 
    // agar so'rov validatsiyadan o'tsa kitobni o'zgartirish
    book.name = req.body.name

    res.send(book)
})


// delete request

app.delete('/api/books/:id', (req, res)=>{
    //kitobni id si bo'yicha topamiz bo'lmasa 404 qaytaramiz
    const book = books.find(b=>b.id=== parseInt(req.params.id))
    if (!book){
        return res.status(404).send('Mavjud bomagan kitob idsi')
    }
    //agar topilsa uni ochiramiz
    const index = books.indexOf(book)
    books.splice(index,1)
    //mijozga o'chirilgan kitobni qaytarmiz
    res.send(book)
})




// listen
const port = 5000
app.listen(port, () => {
    console.log(`${port} portni eshitishni boshladim...`)
})