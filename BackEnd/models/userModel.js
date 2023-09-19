const mongoose = require('mongoose')

const userSchema =  mongoose.Schema({
   personalInfo :{
    name: {type:String},
    Email:{type: String},
    mob_num:{type: String},
   },
   pdfUplaoded :[String],



}, {strict : false})

module.exports = mongoose.model('User', userSchema);