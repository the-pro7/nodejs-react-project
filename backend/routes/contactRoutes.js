const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");
const {
	getContacts,
	getContact,
	createContact,
	updateContact,
	deleteContact,
} = require("../controllers/contactController");
// @desc Get all contacts
// @route GET api/contacts
// @access public
router.get("/", getContacts);

// @desc Create new contact
// @route POST api/contacts
// @access public
router.post("/", createContact);

// Parameterised Routes

// @desc get single contact
// @route GET api/contacts/:id
// @access public
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
