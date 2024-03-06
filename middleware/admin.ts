import {Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
const {User} = require('../models/user')



export default async function admin(req: Request, res: Response, next: NextFunction) {
    try {
        // if (!mongoose.Types.ObjectId.isValid((req as any).user)) return res.status(400).send("Noto'g'ri formatdagi so'rov. :(")
        const user = await User.findById((req as any).user)
        if (!user) return res.status(404).send("Foydalanuvchi topilmadi... :(")
        if (!user.isAdmin) return res.status(403).send('Murojaat rad etildi');
        next();
    } catch (error) {
        return res.status(400).send(error);
    }
}
