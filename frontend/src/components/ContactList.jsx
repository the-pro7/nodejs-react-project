import React from "react";
import "../styles/ContactList.scss";
import PropTypes from "prop-types";
import { useEdit, useUpdateEdit } from "../context/ContactEditProvider";
// import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const ContactList = ({
	contacts,
	loading,
	setError,
	setSuccess,
	setContacts,
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
		const editContact = contacts.find((contact) => contact._id === contactID);

		setEdit(true);
		console.log(edit, editContact, contacts);

		// try {
		// 	const updateOptions = {
		// 		method: "PUT",
		// 		headers: {
		// 			Accept: "application/json",
		// 			"Content-Type": "application/json"
		// 		}
		// 		// body
		// 	}
		// } catch (error) {
		// 	setError("Failed to update your contact's information")
		// }
	}
	return (
		<section className="contact-list">
			<h1>Contacts Added</h1>

			<ul className="contact-list__list">
				{contacts.map((contact) => (
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
			{!contacts.length ? (
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
