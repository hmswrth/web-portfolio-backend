const express = require('express')
const router = express.Router()

router.get('/',async (re1, res) => {
    res.status(200).send('hello there!')
})
module.exports = router