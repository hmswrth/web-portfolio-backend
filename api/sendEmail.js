const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const joi = require('joi')
require('dotenv').config();


router.post('/', async (req, res) => {
    // schema for input validation
    const schema = joi.object(
        {
            name : joi.string().min(3).required(),
            email : joi.string().email().required(),
            subject : joi.string().min(3).required(),
            message : joi.string().min(3).required()
        }
    )

    const result = schema.validate(req.body)

    // error handling on input validation
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return;
    }

    // TODO: send an email with the fields
    console.log(process.env.email)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user : process.env.email,
            pass : process.env.auth,
        }
    })

    const mailOptions = {
        from : process.env.email,
        to: process.env.email,
        subject : req.body.subject,
        text : `clientName : ${req.body.name}, clientEmail : ${req.body.email}, message : ${req.body.message}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            res.status(500).send('failed to send email')
            return
            // console.log(error)
        } else {
            res.status(200).send('sent mail successfully')
            return
        }
    })
})


module.exports = router;