const express = require("express");
const user = require("../api/user");
const { S3uplaod } = require("../Helper/upload_pdf");
const upload_pdf = require("../Helper/upload_pdf");
const userRoutes  = express.Router();
const cloudinary  = require('cloudinary')

userRoutes.post("/merge/uplaodPdf" ,upload_pdf.S3upload.single("file") ,user.MeregPDFs)

module.exports = {
    userRoutes : userRoutes
} 

// cloudinary.v2.uploader.upload("sample.pdf", 
//   function(error, result) {console.log(result, error); });