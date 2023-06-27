const mongoose = require("mongoose")
const MovieSchema = new mongoose.Schema([{
    Movie_name: {
        type: String
    },
    Movie_des:{
        type:String,
        require : true
    },
    Movie_rat:{
        type:String,
        require : true
    },
    Movie_img:{
        type: String,
        require: true
    }
}],{strict:true})

module.exports = mongoose.model("Movie", MovieSchema)