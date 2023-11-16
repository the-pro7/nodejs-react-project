const express = require("express")
const app = express()
const dotenv = require("dotenv").config()

app.use(express.urlencoded({extended: false}))

const port = process.env.PORT || 5000

// app.get("/", (req, res) => {
//     res.status(200).json({message: "Hello World"})
//     console.log(req.originalUrl)
// })

// Use router middleware
app.use("/api/contacts", require("./routes/contactRoutes"))

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})