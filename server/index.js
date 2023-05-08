const express = require('express')
const { connection } = require("./config/db")
const cors = require("cors")
const mongoose = require('mongoose')
const { FoodModel } = require('./model/food.model')


require("dotenv").config()
mongoose.set('strictQuery', false);

const app = express()
app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    res.send("working")
})

app.get('/get', async(req, res) => {
    const data = await FoodModel.find();
   // console.log(data);
    res.send(data)
})

app.post('/post', async (req, res) => {
    const { apiFoodData } = req.body;
  

    console.log(apiFoodData[0].name);
    const name = apiFoodData[0].name;
    const preData = await FoodModel.findOne({ name: name });
  
    if (!preData) {
      FoodModel.create(apiFoodData);
      console.log("Data added successfully");
    } else {
      console.log("Data already available");
    }


    res.send("Data added successfully");
  });

  app.delete('/delete/:id', async(req, res) => {
    await FoodModel.findByIdAndDelete({ _id: req.params.id });
    res.status(201).send("Food deleted");
   
})

const PORT = Number(process.env.PORT) || 8000


const server = app.listen(PORT, async () => {
    try {
        await connection
        console.log("Connected to DB successfully")
    }
    catch (err) {
        console.log(err)
    }

    console.log(`Server running on PORT ${PORT}`)
})
