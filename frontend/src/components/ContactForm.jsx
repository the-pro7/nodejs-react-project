import React, { useState, useRef, useEffect } from "react";
import "../styles/ContactForm.scss";

const ContactForm = () => {
	const [contact, setContact] = useState({});
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [loading, setLoading] = useState(false);

	const formRef = useRef();

	async function handleSubmit(event) {
		event.preventDefault();

		setContact((prevContact) => {
			const newContact = {
				...prevContact,
				name,
				email,
				phone,
			};

			return newContact;
		});

		try {
			setLoading(true);

			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contact),
			};

			let response = await fetch(
				"http://localhost:5003/api/contacts/",
				options
			);
			let data = await response.json();

			if (response.ok) {
				formRef.current.reset();
				console.log("The server accepted the request", data);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
			formRef.current.reset();
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
						onChange={(e) => {
							setName(e.target.value);
						}}
						value={name}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="contact-email">Contact Email</label>
					<input
						type="text"
						placeholder="Enter contact email..."
						name="contact-email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						value={email}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="contact-phone">Contact Phone</label>
					<input
						type="text"
						placeholder="Enter contact phone..."
						name="contact-phone"
						onChange={(e) => {
							setPhone(e.target.value);
						}}
						value={phone}
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
