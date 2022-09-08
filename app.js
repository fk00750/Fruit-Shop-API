const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes/index')

const app = express()

app.get('/', (req,res) => {
    res.send("Welcome")
})

// parse json data
app.use(express.json())
app.use('/api',routes)

app.use(errorHandler)

module.exports = app