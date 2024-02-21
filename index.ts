import express, { Express, NextFunction, Request, Response } from "express";
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from "dotenv";
import config from 'config'
// const logger = require('./logger')
//  import {logger} from './logger'
// import {autentifikatsiya} from './autentifikatsiya'

const app : Express = express()
// app.use(logger)
// app.use(autentifikatsiya)
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))
app.use(helmet())
if(app.get('env')==='development'){
    app.use(morgan('tiny'))
}
console.log(config.get('name'));
console.log(config.get('mailserver.host'));




dotenv.config();


const port = process.env.PORT || 5000

app.get('/', (req:Request, res:Response)=>{
    res.send('TypeScript and Expressjs')
})

app.listen(port, ()=>{
    console.log(`${port} ni eshitishni boshladim...sas`);
    
})
