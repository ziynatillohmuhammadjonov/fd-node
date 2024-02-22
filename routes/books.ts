// const express = require('express')
import * as Joi from "joi";
import express, {Express, Request, Response, Router} from 'express'
const router :Router = express.Router()
// router.use(express.json())
interface iBooks{
        id:number,
        name: string
}

export const books :iBooks[] = [
    { id: 1, name: 'rich dad poor dad' },
    { id: 2, name: 'Nextjs Real World' },
    { id: 3, name: 'TypeScript news' },

]

// book validatsiya
function validateBook (bookName:string){
    const bookSchema = Joi.object({
        name: Joi.string().required().min(3).max(50),
    })
    return bookSchema.validate(bookName)
}




router.get('/', (req: Request, res: Response) => {
    // res.send(['rich dad poor dad', 'algorithm', 'Nextjs Real World', 'TypeScript news'])
    res.send(books)
})

router.get('/:id', (req: Request, res: Response) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (!book) {
       return res.status(404).send('Berilgan id ga teng kitob topilmadi.')
    }
    res.send(book)
})

// router.get('/api/articles/:year/:month', (req: Request, res: Response) => {
//     res.send(req.query)

// })


// post request
router.post('/', (req: Request, res: Response) => {

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
router.put('/:id', (req: Request, res: Response) => {
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

router.delete('/:id', (req: Request, res: Response)=>{
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

module.exports = router