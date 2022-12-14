const express = require('express')
const app = express()
const sendEmail = require('./api/sendEmail')
const hello = require('./api/hello')
const cors = require('cors')
app.use(cors({
    origin: '*'
}));


app.use(express.json({extended : false}))
app.use('/api/sendMessage', sendEmail)
app.use('/',hello)


const port = process.env.PORT || 8000
app.listen(port, () => console.log(`listening on port ${port}...`))