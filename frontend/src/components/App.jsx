import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import "../styles/App.scss";

function App() {
	const [error, setError] = useState("");
	const [contacts, setContacts] = useState({});

	const BASE_URL = "http://localhost:5003/api/contacts/";

	useEffect(() => {
		async function getContacts(BASE_URL) {
			try {
				const options = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};

				let response = await fetch(BASE_URL, options);
				let data = await response.json();
				setContacts(data);
				console.log(contacts);
			} catch (error) {
				setError(error);
				console.log(error);
			}
		}

		getContacts(BASE_URL);
	}, []);

	return (
		<main className="wrapper">
			<h1 className="title">Pro FullStack Contact Manager</h1>
			<div className="wrapper__content">
				{error && <p>{error}</p>}
				<ContactForm />
				<ContactList contacts={contacts} />
			</div>
		</main>
	);
}

export default App;
