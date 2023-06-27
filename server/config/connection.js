const mongoose = require("mongoose")
const MONGO_URL = "mongodb://127.0.0.1:27017/myapp"

const connection = mongoose.connect(MONGO_URL) 
console.log("server connected to mongo db ")


module.exports = connection