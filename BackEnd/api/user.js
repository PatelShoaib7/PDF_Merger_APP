"use strict";
const cloudinary = require("cloudinary");
const fs = require("fs");
const userSchema = require("../models/userModel");
const utils = require("../utils/utils");

const checkWorking = (req, res) => {
  utils.sendResponse(req, res, 200, "Hellow World !", [
    { Sucess: "Yes You Got It !" },
  ]);
};

const colletUserData = async (req, res) => {
  let { Email, name } = req.body;
  if (!Email) {
    res.send({ errMsg: "Plz Enter Valid Email" });
  }
  let userExist = await userSchema.find({ Email: Email });

  if (userExist.length) {
    res.send({
      errMsg: "User With Email Id Already Exits Please Use Diffrnet ID",
    });
  }
  let user = await userSchema.create({
    "personalInfo.Email": Email,
  });

  if (!user) {
    res.send({ errMsg: "Data Base Error" });
  }
  res.send({ errMsg: "user sucessfully" });
};

const UploadPDF_S = async (req, res) => {
  const path = req.file.path;
  const uniqueFilename = new Date().toISOString();

  //-------------------    UPLOAD DATA TO CLOUDINARY    -------------------

  cloudinary.v2.uploader.upload(path, async function (err, result) {
    console.log("-----------------Execution Block----------------");

    if (err) {
      console.log("------------Error occurred-----------", err);
      return utils.sendResponse(req, res, 200, "! Ooops Something Went Wrong", [
        { error: err },
      ]);
    } else {
      console.log("---------------File uploaded to Cloudinary-------------");
      // remove file from server
      fs.unlinkSync(path);

      return utils.sendResponse(req, res, 200, "PDF Uploaded Successfully", [
        { file: result },
      ]);
    }
  });
};

module.exports = {
  colletUserData: colletUserData,
  UploadPDF_S: UploadPDF_S,
  checkWorking: checkWorking,
};
