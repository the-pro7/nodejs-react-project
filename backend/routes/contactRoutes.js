const express = require("express")
const router = express.Router()
const Contact = require("../models/contactModel")
// @desc GET api/contacts
// @route GET
// @access public
router.get("/", (req, res) => {
    res.status(200).json({message: "Hello World"})
})

// @desc POST api/contacts
// @route POST
// @access public
router.post("/", (req, res) => {
    res.status(201).json({message: "Create new contact"})
})

// Parameterised Routes

// @desc GET api/contacts/:id
// @route GET
// @access public

router.route("/:id").get((req, res) => {
    res.status(200).json({message: `Get contact deetails for ${req.params.id}`})
}).put((req, res) => {
    res.status(200).json({message: `Update contact with ID ${req.params.id}`})
})


module.exports = router