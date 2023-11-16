const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a contact name!"]
    },

    email: {
        type: String,
        required: [true, "Please add the email for the contact!"]
    }
}, {timestamps: true})

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact