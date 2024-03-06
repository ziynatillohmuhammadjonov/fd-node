import jwt from 'jsonwebtoken';
import type { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express';
import config from 'config'

interface IGetUserAuthInfoRequest extends Request {
    user?: string // or any other type
  }
export default function auth(req:IGetUserAuthInfoRequest, res:Response, next:NextFunction) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Token bo\'lmaganligi sababli murojaat rad etildi');
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')) as string ;
        req.user = decoded;
        next();
    }
    catch (ex) {
        return res.status(400).send('Yaroqsiz token');
    }

}