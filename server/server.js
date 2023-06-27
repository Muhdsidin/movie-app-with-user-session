const express = require('express')
const app = express()
const cors = require("cors")
const PORT = 3006
const db = require('./config/connection')
const userRoute = require("./routes/userRoute")
const movieRoute = require("./routes/MovieRouter")

app.use(cors())
app.use(express.json())
app.use(express.static("public"));

app.use("/user", userRoute)
app.use("/movie", movieRoute)

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`)
}) 