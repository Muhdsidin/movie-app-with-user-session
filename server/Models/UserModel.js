const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema([{
    email :{
        type: String,
        required : true
    },
    username:{
        type: String,
        required : true
    },
    password:{
        type:String,
        require: true
    },
    movie:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    }]
}],{strict:true})

module.exports = mongoose.model("User", UserSchema)