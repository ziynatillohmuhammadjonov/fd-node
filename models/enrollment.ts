import express, { Express, Router, Response } from "express";
import * as Joi from 'joi'
import mongoose from "mongoose";
const { courseSchema } = require('./course')

interface iEnrollment {
    customerId: string,
    courseId: string
}
const enrollmentSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            }
        }),
        required: true
    },
    course: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true
    },
    dateStart: {
        type: Date,
        required: true,
        default: Date.now
    },
    courseFee: {
        type: Number,
        min: 0
    }
}, { versionKey: false })

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)
function validateEnrollments(body: iEnrollment) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        courseId: Joi.string().required(),

    })
    return schema.validate(body)
}

exports.validate = validateEnrollments
exports.Enrollment = Enrollment