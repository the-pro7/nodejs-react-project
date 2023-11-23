const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	const contact = await Contact.find({});

	if (!contact) {
		throw new Error("Failed to get contacts!!!");
	}
	// console.log(req.originalUrl);
	// console.log(req.body);
	res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { name, email, phone } = req.body;

	const contact = await Contact.create({
		name: name,
		email: email,
		phone: phone,
	});

	// if (!contact) {
	//     throw new Error("Failed to add your new contact")
	// }

	console.log(name, email, phone);
	res.status(201).json(contact);
});

// @desc get a single contact
// @route GET /api/contacts/:id
const getContact = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const contact = await Contact.findById(id);

	if (!contact) {
		res.status(404);
		throw new Error(`Contact not found!`);
	}
	res.status(200).json(contact);
});

// @desc get a single contact
// @route GET /api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const contact = await Contact.findById(id);

	if (!contact) {
		res.status(404);
		throw new Error(`Contact not found!`);
	}
	const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	res.status(201).json(updateContact);
});

const deleteContact = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const contact = await Contact.findById(id);

	if (!contact) {
		res.status(404);
		throw new Error(`Contact not found`);
	}

	await Contact.deleteOne();
	res.status(204).json(contact);
});

module.exports = {
	getContacts,
	getContact,
	createContact,
	updateContact,
	deleteContact,
};
