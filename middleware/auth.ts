import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from 'config'

export default function auth(req:Request, res:Response, next:NextFunction) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Token bo\'lmaganligi sababli murojaat rad etildi');
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')) as string ;
        (req as any).userId = decoded;
        next();
    }
    catch (ex) {
        return res.status(400).send('Yaroqsiz token');
    }

}