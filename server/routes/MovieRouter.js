const express = require("express");
const router = express.Router();
const MovieModel = require("../Models/MovieModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("upload_file"), async (req, res) => {
  try {
    console.log(req.file);
    const { moviename, moviedis, movierat } = req.body;
    await MovieModel.create({ Movie_name: moviename, Movie_des: moviedis, Movie_rat: movierat, Movie_img: req.file.filename });
    res.status(200).json({
      message: "successfully upload",
    });
  } catch (error) {
    res.status(401).json({
      message: "sorry, try again one more time",
    });
  }
});

router.get("/get-movie", async (req,res) => {
  //console.log(imageData)
  const movieData = await MovieModel.find()
 /* const AllData = {
    data : {movieData,imageData}

  }*/
   
  res.json(movieData)
});

router.delete("/delete-movie",async(req,res)=>{
  console.log(req.body)
  await MovieModel.findByIdAndDelete(req.body.id)
  const Data = await MovieModel.find()
  res.status(200).json(Data)
})


  
module.exports = router;
