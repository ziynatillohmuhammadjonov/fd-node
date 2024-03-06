import bcrypt from "bcrypt";
import * as _ from "lodash";
import express,{ Router, Response,Request } from "express";
const {validate, User} =require('../models/user')

const router:Router = express.Router()
// add user
router.post('/', async(req:Request, res:Response)=>{
    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        const emailUser = await User.findOne({ email: req.body.email })
        if (emailUser) return res.status(400).send("Mavjud bo'lgan foydalanuvchi.")
        const user = new User(_.pick(req.body, ['name', 'email', 'password',"isAdmin"]))
        const salt =await bcrypt.genSalt()
        const hash = await bcrypt.hashSync(user.password, salt)
        user.password = hash
        await user.save()
        res.send(_.pick(user, ['_id','name','email']))

    } catch (error) {
        return console.log(error)
    }
})

module.exports = router
