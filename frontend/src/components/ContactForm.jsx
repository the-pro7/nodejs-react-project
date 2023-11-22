import React, { useState, useRef, useEffect } from "react";
import "../styles/ContactForm.scss";

const ContactForm = () => {
	const [contact, setContact] = useState({});
	const [loading, setLoading] = useState(false);

	const formRef = useRef();

	async function handleSubmit(event) {
		event.preventDefault();

		// setContact({ ...contact, name, email, phone });
		console.log(contact);

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

			console.log(response.status);
			if (response.ok) {
				// formRef.current.reset();
				console.log(formRef.current);
				const children = [...formRef.current.querySelectorAll("input")];

				console.log(children);
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
