const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')
const route = require("./router")
require("dotenv").config()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

mongoose
    .connect(process.env.MOGODB_URL)
    .then(()=>{
        console.log("Db connected")
    })
app.use(route)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))