const express = require('express')
const joi = require('joi')
const nodemailer = require('nodemailer')
require('dotenv').config();

const app = express()

app.use(express.json())

const port = process.env.PORT || 8000

app.get('/',(req, res) => {
    res.send('hello')
})

app.post('/api/sendMessage', (req, res) => {

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
            res.status(300).send('sent mail successfully')
            return
        }
    })
})

app.listen(port, () => console.log(`listening on port ${port}...`))