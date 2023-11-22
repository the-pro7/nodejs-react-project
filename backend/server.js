const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5000

// app.get("/", (req, res) => {
//     res.status(200).json({message: "Hello World"})
//     console.log(req.originalUrl)
// })

// Use router middleware
app.use("/api/contacts", require("./routes/contactRoutes"))

// Connect to MongoDB

mongoose.connect(process.env.CONNECTION_STRING).then(() => {

    app.listen(port, () => {
        console.log(`Server running on ${port}`)
    })
}).catch(error => console.log(error.stack)).finally(() => {
    console.log("Something happened!!!")
})

const connection = mongoose.connection

connection.once("open", () => {
    console.log("MongoDB just joined the fun!!!")
})
