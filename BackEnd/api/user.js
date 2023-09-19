'use strict'
const cloudinary  = require('cloudinary')
const fs = require("fs")
const userSchema = require("../models/userModel")



const checkWorking =(req, res)=>{
   res.send("Hellow World !")
}


const colletUserData =async(req , res )=>{
 let {Email, name} = req.body;
if(!Email){
  res.send({errMsg:"Plz Enter Valid Email"})
}
 let userExist = await userSchema.find({Email: Email})

if(userExist.length){
  res.send({errMsg:"User With Email Id Already Exits Please Use Diffrnet ID"})
   
}
      let user = await userSchema.create({
        "personalInfo.Email":Email
      })
    
      if(!user){
        res.send({errMsg:"Data Base Error"})
      }
      res.send({errMsg:'user sucessfully'})
}






const MeregPDFs =async (req , res )=>{
    const path = req.file.path
    const Email = req.body?.Email
    
    let userExist = await userSchema.find({Email: Email})

    if(userExist.length){
      res.send({errMsg : "Email Id Alredy In Use Plese Use Another Email ID"})
    }


    console.log("-----------------email----",req.body.Email)
    const uniqueFilename = new Date().toISOString()

    //console.log("----------uniqueFilename--------",uniqueFilename)

    cloudinary.v2.uploader.upload(
    path, //------------ directory and tags are optional
    async function(err, result) {
        console.log("errrrrr bloc")

    if (err){
    console.log("errror", err)
    return res.send(err) 
    }
 let pdfUplaoded =[
  {
    
  }
 ]
    console.log("file uploaded to Cloudinary")
    // remove file from server
    fs.unlinkSync(path)    

    const saveToUser  = await userSchema.finAndUpdate({$Email:Email},{$set:{

    }})

    // console.log("--------------result-----",result)
    //   res.send(result)
}
)}


module.exports ={
  colletUserData:colletUserData,
    MeregPDFs : MeregPDFs,
    checkWorking: checkWorking 
}