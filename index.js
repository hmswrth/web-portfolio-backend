const express = require('express')
const app = express()
const sendEmail = require('./api/sendEmail')

app.use(express.json({extended : false}))
app.use('/api/sendMessage', sendEmail)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`listening on port ${port}...`))