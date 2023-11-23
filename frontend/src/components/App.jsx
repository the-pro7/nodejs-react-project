import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import "../styles/App.scss";

function App() {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [contacts, setContacts] = useState([]);
	const [loading, setLoading] = useState(false);

	const BASE_URL = "http://localhost:5003/api/contacts/";

	useEffect(() => {
		async function getContacts(BASE_URL) {
			setLoading(false);
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			};

			try {
				let response = await fetch(BASE_URL, options);
				let data = await response.json();
				setLoading(true);
				setContacts(data);
			} catch (error) {
				setError(error);
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		getContacts(BASE_URL);

		// setContacts();
	}, [contacts]);

	return (
		<main className="wrapper">
			{/* {console.log(contacts)} */}
			<h1 className="title">Pro FullStack Contact Manager</h1>
			<div className="wrapper__content">
				{error && <p>{error}</p>}
				<ContactForm />
				<ContactList
					contacts={contacts}
					loading={loading}
					setError={setError}
					setSuccess={setSuccess}
					setContacts={setContacts}
				/>
			</div>
		</main>
	);
}

export default App;
