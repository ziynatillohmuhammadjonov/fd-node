import { NextFunction, Request, Response } from 'express'

export function autentifikatsiya(req:Request, res:Response, next:NextFunction){
    console.log('Autentifikatsiya funksiyasi...');
    next()
}