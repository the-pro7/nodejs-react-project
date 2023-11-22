const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler")
// @desc GET api/contacts
// @route GET
// @access public
router.get("/", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	const contact = await Contact.find({})

	if (!contact) {
		throw new Error("Failed to get contacts!!!")
	}
	// console.log(req.originalUrl);
	// console.log(req.body);
	res.status(200).json(contact);
});

// @desc Create new contact
// @route POST api/contacts
// @access public
router.post("/", async (req, res) => {
	console.log(req.body);
	const { name, email, phone } = req.body;

    const contact = await Contact.create({
        name: name,
        email: email,
        phone: phone
    })

    // if (!contact) {
    //     throw new Error("Failed to add your new contact")
    // }

	console.log(name, email, phone);
	res.status(201).json(contact);
});

// Parameterised Routes

// @desc GET api/contacts/:id
// @route GET
// @access public

router
	.route("/:id")
	.get((req, res) => {
		res
			.status(200)
			.json({ message: `Get contact deetails for ${req.params.id}` });
	})
	.put((req, res) => {
		res
			.status(200)
			.json({ message: `Update contact with ID ${req.params.id}` });
	});

module.exports = router;
