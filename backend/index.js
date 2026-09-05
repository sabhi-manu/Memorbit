const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./configs/database")
const cookieParser = require("cookie-parser")
// routes
const userRotue = require("./routes/user.route")
const imageRoute = require("./routes/story.route")
const path = require("path")

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.use(cors({
    origin:"*",
    credentials:true
}))
 
connectDB()

//test api
app.get("/api/test" ,(req,res)=>{
    res.status(200).json({message:"testing of api successful."})
})

app.use("/api/user",userRotue)
app.use("/api/story",imageRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log("server runing on port : ",PORT)
})

module.exports = app