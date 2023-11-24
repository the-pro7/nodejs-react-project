import React, { useContext, useState } from "react";
import { createContext } from "react";

const EditContext = createContext();
const EditUpdaterContext = createContext();

export function useUpdateEdit() {
	return useContext(EditUpdaterContext);
}
export function useEdit() {
	return useContext(EditContext);
}

const ContactEditProvider = ({ children }) => {
	const [edit, setEdit] = useState(false);

	// Function to update the current edit state
	const updateEdit = (newValue) => setEdit(newValue);
	return (
		<EditUpdaterContext.Provider value={updateEdit}>
			<EditContext.Provider value={edit}>{children}</EditContext.Provider>
		</EditUpdaterContext.Provider>
	);
};

export default ContactEditProvider;
