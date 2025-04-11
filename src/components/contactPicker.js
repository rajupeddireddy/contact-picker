import React, { useState } from 'react';

const ContactPicker = () => {
  const [selectedContacts, setSelectedContacts] = useState([]);

  const handlePickContact = async () => {
    try {
      const supported = 'contacts' in navigator && 'ContactsManager' in window;
      if (!supported) {
        alert('Contact Picker API is not supported on this browser.');
        return;
      }

      const props = ['tel', 'name']; // Request phone number and name
      const opts = { multiple: true }; // Set to true for multiple contacts

      const contacts = await navigator.contacts.select(props, opts);

      if (contacts.length > 0) {
        setSelectedContacts(
          contacts.map((contact) => ({
            name: contact.name?.[0] || 'Unknown',
            tel: contact.tel?.[0] || 'No number',
          }))
        );

        // Autofill the first number into the input field if needed
        document.getElementById('phoneInput').value = contacts[0].tel?.[0] || '';
      }
    } catch (err) {
      console.error('Contact selection failed', err);
    }
  };

  return (
    <div>
      <button onClick={handlePickContact}>Pick Contact(s)</button>

      {selectedContacts.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <h3>Selected Contact(s):</h3>
          <ul>
            {selectedContacts.map((contact, index) => (
              <li key={index}>
                {contact.name} - {contact.tel}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactPicker;
