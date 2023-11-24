import React from "react";
import "../styles/ContactList.scss";
import PropTypes from "prop-types";
import { useEdit, useUpdateEdit } from "../context/ContactEditProvider";

const ContactList = ({
	contacts,
	setContacts,
	// Single contact
	contact,
	setContact,
	// Error && success
	setError,
	setSuccess,
}) => {
	const edit = useEdit();
	const setEdit = useUpdateEdit();

	const BASE_URL = "http://localhost:5003/api/contacts/";
	async function handleDelete(contactID) {
		console.log(contactID);
		try {
			const deleteOptions = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			};
			const response = await fetch(`${BASE_URL}${contactID}`, deleteOptions);

			setContacts((prevContact) =>
				prevContact.filter((contact) => contact._id === contactID)
			);

			if (!response.ok) {
				throw new Error("Failed to delete the contact");
			}

			setSuccess("Contact Deleted");
		} catch (error) {
			setError("Failed to delete your contact");
			console.log(error);
		}
	}
	async function handleEdit(contactID) {
		const contactToUpdate = contacts.find(
			(contact) => contact._id === contactID
		);
		setContact({ ...contact, ...contactToUpdate });
		console.log(contact);

		try {
			const updateOptions = {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contact),
			};

			let response = await fetch(`${BASE_URL}${contactID}`, updateOptions);

			if (response.ok) {
				setContacts((prevContact) => {
					prevContact?.map((prevContact) => {
						prevContact._id === contactID
							? { ...prevContact, ...contact }
							: prevContact;
					});
				});
				console.log("Successfully updated the resource! Congrats!!!");
			} else {
				throw new Error("Failed to update your contact!");
			}
		} catch (error) {
			setError("Failed to update your contact's information");
		}
	}
	return (
		<section className="contact-list">
			<h1>Contacts Added</h1>

			<ul className="contact-list__list">
				{contacts?.map((contact) => (
					<li key={contact._id} className="contact">
						<p>
							Name: <strong>{contact.name}</strong>
						</p>
						<p>
							Email: <strong>{contact.email}</strong>
						</p>
						<p>
							Phone: <strong>{contact.phone}</strong>
						</p>
						<div className="action-buttons">
							<button onClick={() => handleDelete(contact._id)}>Delete </button>
							<button onClick={() => handleEdit(contact._id)}>Edit</button>
						</div>
					</li>
				))}
			</ul>
			{!contacts?.length ? (
				<p className="show-status">No contacts added</p>
			) : (
				<p className="show-status">Contacts added {contacts.length}</p>
			)}
		</section>
	);
};

ContactList.propTypes = {
	loading: PropTypes.bool.isRequired,
};

export default ContactList;
