import mongoose from "mongoose";
import express,{ Router, Response,Request } from "express";
const {validate, User} =require('../models/user')

const router:Router = express.Router()
// get user
router.post('/', async(req:Request, res:Response)=>{
    try {
        const {error} = validate(req.body)
        if(error) return 
    } catch (error) {
        
    }
})

module.exports = router
