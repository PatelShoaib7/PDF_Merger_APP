const express  = require('express')
require('dotenv').config() 
const cors  = require('cors')
const app = express();
const cloudinary = require('cloudinary')
const PORT =5040
const {userRoutes}  = require("./Routes/userRoutes");
const {adminRoutes} = require('./Routes/adminRoutes');
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/user", userRoutes)
app.use("/admin", adminRoutes)
console.log("----app starteed--")

cloudinary.v2.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  }); 

app.listen(PORT || 8000, (req, res)=>{
    console.log(`Port Started Running on Port ${PORT}`)
})