const express  = require('express')
const cors  = require('cors')
const app = express();
require('dotenv').config() 
const cloudinary = require('cloudinary')
const PORT = process.env.PORT
const {userRoutes}  = require("./Routes/userRoutes");
const {adminRoutes} = require('./Routes/adminRoutes');
const { connection } = require('./services/dataBase');
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/user", userRoutes)
app.use("/admin", adminRoutes) 

/* error handling for 404 routes */
app.use(function(req, res, next) {
    var err = new Error('request not found')
    err.status = 404
    res.status(err.status || 500).send({
        errCode: 23,
        errMsg: 'request not found'
      })
  });
  // In prod, dont return stacktrace to the browser

console.log("----app starteed--")


app.listen(PORT || 8000, async (req, res)=>{

    await connection
    if(!connection){
        res.status(err.status || 500).send({
            errCode: 23,
            errMsg: 'Unable To Connect With DataBase'
          })
    }
    console.log(`Port Started Running on Port ${PORT}`)
})