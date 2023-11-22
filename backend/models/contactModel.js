const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Add a name"],
		},
		email: {
			type: String,
			required: [true, "Add an email please"],
		},
		phone: {
			type: String,
			required: [true, "Add a phone please!"],
		},
	},
	{ timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
