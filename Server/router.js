const express = require('express')
const router = express.Router()
const model = require("./productModel")


router.get('/',async (req,res)=>{
    const product = await model.find()
    res.send(product)
})

router.post('/save', async (req,res)=>{
    const text = req.body
    console.log(text)
    const savedProduct= await model.create(text)
    .then(()=>{
        res.send("data saved")
    })
})

router.post('/update/:id', ( async (req,res)=>{
    const details = req.body
    const {id} = req.params
    console.log(details , id)
    const updateData = await model.findByIdAndUpdate(id, details)
    .then(()=>{
        res.send("update success")
    })
}))

router.post("/delete/:id",async (req,res)=>{
    const {id} = req.params
    console.log( id)
    const deleteData = await model.findByIdAndDelete(id)
    .then(()=>{
        res.send("deleted")
    })
})

module.exports = router