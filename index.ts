

import express, {Express, Request, Response} from 'express'
import mongoose from 'mongoose'
// routes
const categories = require('./routes/categories')
const customers = require('./routes/customers')
const courses = require('./routes/courses')
const enrollments = require('./routes/enrollmets')
const users = require('./routes/users')
const auth = require('./routes/auth')

const app:Express = express()



mongoose.connect('mongodb://localhost/virtualDars').then(()=>{
    console.log('MongoDb ga ulanish hosil qildim..');
}).catch((err)=>{
    console.log('MongoDb ga ulanishda xatolik sodir boldi... ' + err);
})


app.use(express.json())
app.use('/api/categories', categories)
app.use('/api/customers', customers)
app.use('/api/courses', courses)
app.use('/api/enrollments', enrollments)
app.use('/api/users', users)
app.use('/api/auth', auth)


app.listen(5000,()=>{
    console.log('5000 chi portni eshitishni boshladim...');
    
})
