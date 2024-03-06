const { User } = require('../models/user')
import express, { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import * as Joi from 'joi'
import * as _ from 'lodash'

const router: Router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send("Email yoki parol noto'g'ri")

        const isVlidPassword = await bcrypt.compare(req.body.password, user.password)
        if (!isVlidPassword) return res.status(400).send("Email yoki parol noto'g'ri")

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(true);
    } catch (error) {
        return console.log(error)
    }
})

interface iReq {
    email: string,
    password: string
}

function validate(req: iReq) {
    const schema = Joi.object<iReq>({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    return schema.validate(req)

}
module.exports = router

