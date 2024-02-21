import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 5000
const app :Express = express()

app.get('/', (req:Request, res:Response)=>{
    res.send('TypeScript and ')
})

app.listen(port, ()=>{
    console.log(`${port} ni eshitishni boshladim...sas`);
    
})