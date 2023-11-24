import React, { useState, useRef } from "react";
import "../styles/ContactForm.scss";
import { useEdit, useUpdateEdit } from "../context/ContactEditProvider";


const ContactForm = () => {
	const [contact, setContact] = useState({});
	const [loading, setLoading] = useState(false);
	const nameRef = useRef();
	const emailRef = useRef();
	const phoneRef = useRef();

	const formRef = useRef();

	// Edit 
	const edit = useEdit()
	const setEdit = useUpdateEdit()

	async function handleSubmit(event) {
		event.preventDefault();

		console.log(contact);

		try {
			setLoading(true);

			const postOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contact),
			};

			let response = await fetch(
				"http://localhost:5003/api/contacts/",
				postOptions
			);
			let data = await response.json();

			console.log(response.status);
			if (response.ok) {
				setContact({ ...contact, name: "", email: "", phone: "" });
				console.log("The server accepted the request", data);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}

		console.log(contact);
	}

	return (
		<section className="contact">
			<h1 className="contact__header">Add a new contact</h1>
			<form
				action="#"
				className="contact__form"
				onSubmit={handleSubmit}
				ref={formRef}
			>
				<div className="form-group">
					<label htmlFor="contact-name">Contact Name</label>
					<input
						type="text"
						placeholder="Enter contact name..."
						name="contact-name"
						ref={nameRef}
						onChange={(e) => {
							setContact({ ...contact, name: e.target.value });
						}}
						value={contact.name}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="contact-email">Contact Email</label>
					<input
						type="text"
						placeholder="Enter contact email..."
						name="contact-email"
						ref={emailRef}
						onChange={(e) => {
							setContact({ ...contact, email: e.target.value });
						}}
						value={contact.email}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="contact-phone">Contact Phone</label>
					<input
						type="text"
						placeholder="Enter contact phone..."
						name="contact-phone"
						ref={phoneRef}
						onChange={(e) => {
							setContact({ ...contact, phone: e.target.value });
						}}
						value={contact.phone}
					/>
				</div>
				<button type="submit" disabled={loading}>
					Add Contact
				</button>
			</form>
		</section>
	);
};

export default ContactForm;
