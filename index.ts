// import express, { Express, NextFunction, Request, Response } from "express";
// import helmet from 'helmet'
// import morgan from 'morgan'
// import dotenv from "dotenv";
// import config from 'config'
// import pug from 'pug'

// const app : Express = express()

// // middleware import
// // const logger = require('./logger')

// //router importlar
// const books = require('./routes/books')
// const categories = require('./routes/virtualLesson')


// // app.use(logger)
// // app.use(autentifikatsiya)
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'))
// app.use(helmet())

// // routerlar
// app.use('/api/books', books)
// app.use('/api/categories', categories)

// app.set('view engine', 'pug')

// // if(app.get('env')==='development'){
// //     app.use(morgan('tiny'))
// // }
// // console.log(config.get('name'));
// // console.log(config.get('mailserver.host'));

// dotenv.config();

// const port = process.env.PORT || 5000

// app.get('/', (req:Request, res:Response)=>{
//     // res.send('TypeScript and Expressjs')
//     res.render('index', {title: 'Bosh sahifa', greeting: 'Assalomu alaykum'})
// })

// app.listen(port, ()=>{
//     console.log(`${port} ni eshitishni boshladim...sas`);

// })


import mongoose from 'mongoose'

// mongoose.connect('mongodb://localhost/test').then(() => {
//     console.log('MongoDBga ulanish hosil qildim...');
// }).catch((err) => {
//     console.log("MongoDbga ulanishda xatolk bo'ldi " + err);
// })

// const bookSchema = new mongoose.Schema({
//     name: String,
//     author: String,
//     tags: [String],
//     date: { type: Date, default: Date.now },//schemani default qiymatini qo'yish
//     isPublished: Boolean
// })
// const Book = mongoose.model("Book", bookSchema)


// async function createBook() {
//     const book = new Book({
//         name: "NodeJs to'liq qo'llanma",
//         author: 'Farhod Dadajonov',
//         tags: ['js', 'dasturlash', 'node'],
//         isPublished: false
//     })
//     const saveBook = await book.save()
//     console.log(saveBook);
// }
// // createBook()

// async function getBook() {
//     const books = await Book.find({
//         author: 'Farhod Dadajonov'
//     }).limit(1).sort({ name: 1 }).select({ name: 1, tags: 1 });
//     console.log(books);

// }
// // getBook()

// // Paginatsiyani amalga oshirish uchun uni .limit va .skip metodlari orqali amalga 
// async function getBookWithPagination() {
//     const pageNumber = 3;
//     const pageSize = 10
//     // /api/books?pageNumber=3&pageSize=10
//     const books = await Book.find({
//         author: 'Farhod Dadajonov'
//     })
//     .skip((pageNumber-1)*pageSize)
//     .limit(pageSize)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//     console.log(books);

// }

// // getBookWithPagination()

mongoose.connect('mongodb://localhost/usersTest').then(()=>{
    console.log("MondoDb ga ulanish hosil qilmdim..");
}).catch((err)=>{
    console.log('MongoDbga ulanishda xatolik sodir boldi '+err);
})


interface iUser {
    name: String,
    phoneNumber:String,
    email: String,
    address:String,
    userAgent: String,
    hexcolor:String
}

const user = new  mongoose.Schema<iUser>({
    name: {type: String, required:true},
    phoneNumber:{type: String, required:true},
    email: {type: String, required:true},
    address:{type: String, required:true},
    userAgent: {type: String, required:true},
    hexcolor:{type: String, required:true}
})

const User = mongoose.model('User', user)

async function getUser() {
    const users =await User
    .find()
    .select({name:1, hexcolor:1})
    console.log(users);
    
}
getUser()