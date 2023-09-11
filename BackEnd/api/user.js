'use strict'
const cloudinary  = require('cloudinary')
const fs = require("fs")

const MeregPDFs =async (req , res )=>{
  //console.log("------------------file", req.file)
    const path = req.file.path
    const uniqueFilename = new Date().toISOString()

    console.log("----------uniqueFilename--------",uniqueFilename)

    cloudinary.v2.uploader.upload(
    path, //------------ directory and tags are optional
    async function(err, result) {
        console.log("errrrrr bloc")
    if (err){
    console.log("errror", err)
    return res.send(err) 
    }
  console.log("file uploaded to Cloudinary")
fs.unlinkSync(path)      // // remove file from server
console.log("--------------result-----",result)
  res.send(result)
}
)}



module.exports ={
    MeregPDFs : MeregPDFs
}