import React, {useContext, useState} from 'react'

const formContext = React.createContext()

const FormProvider = ({children}) => {
    const [formData, setValues] = useState()
  return (
    <formContext.Provider>
        {children}
    </formContext.Provider>
  )
}

export default FormProvider