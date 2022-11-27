const express = require('express')
const app = express()
const sendEmail = require('./api/sendEmail')
const hello = require('./api/hello')
const cors = require('cors')


app.use(express.json({extended : false}))
app.use('/api/sendMessage', sendEmail)
app.use('/',hello)
app.use(cors({
    origin: '*'
}));


const port = process.env.PORT || 8000
app.listen(port, () => console.log(`listening on port ${port}...`))