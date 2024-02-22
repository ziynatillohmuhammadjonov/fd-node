import { NextFunction, Request, Response } from 'express'

function logger(req:Request, res:Response, next:NextFunction){
    console.log('Bu log funksiya...');
    next()
}
module.exports = logger