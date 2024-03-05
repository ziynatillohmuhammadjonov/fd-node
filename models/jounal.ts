import mongoose from "mongoose";
import * as Joi from 'joi';

interface iJournal extends mongoose.Document{
    customerName:string,
    courseTitle:string,
    date: Date
}

const journalSchema = new mongoose.Schema<iJournal>({
    customerName:{
        type: String,
        required: true
    },
    courseTitle:{
        type:String,
        requirde: true
    },
    date:{
        type:Date,
        required: true,
        default: Date.now
    }
})
const Journal = mongoose.model('Journal', journalSchema)

exports = Journal