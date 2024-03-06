import {Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
const {User} = require('../models/user')



export default async function admin(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findById((req as any).userId)
        if (!user) return res.status(404).send("Foydalanuvchi topilmadi... :(")
        if (!user.isAdmin) return res.status(403).send('Murojaat rad etildi');
        next();
    } catch (error) {
        return res.status(400).send(error);
    }
}
