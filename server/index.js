const express = require('express')
const { connection } = require("./config/db")
const cors = require("cors")
const mongoose = require('mongoose')


require("dotenv").config()
mongoose.set('strictQuery', false);
const app = express()
app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.get('/',(req, res)=>{
    res.send("working") 
})

const PORT = Number(process.env.PORT) || 8000


const server = app.listen(PORT, async ()=>{
    try{
       await connection
        console.log("Connected to DB successfully")
    }
    catch(err){
        console.log(err)
    }
    
    console.log(`Server running on PORT ${PORT}`)
})