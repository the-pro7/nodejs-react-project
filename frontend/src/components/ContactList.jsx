import React from 'react'
import "../styles/ContactList.scss"

const ContactList = ({contacts}) => {
  return (
    <section className='contact-list'>
        <h1>Contacts Added</h1>
        <ul className="contact-list__list">

        </ul>
    </section>
  )
}

export default ContactList