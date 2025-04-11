import React, { useState } from 'react';
import Button from '@mui/material/Button';

const ContactPicker = () => {
  const [selectedContacts, setSelectedContacts] = useState([]);

  const handlePickContact = async () => {
    try {
      const supported = 'contacts' in navigator && 'ContactsManager' in window;
      if (!supported) {
        alert('Contact Picker API is not supported on this browser.');
        return;
      }

      const props = ['tel', 'name'];
      const opts = { multiple: true };

      const contacts = await navigator.contacts.select(props, opts);

      if (contacts.length > 0) {
        setSelectedContacts(
          contacts.map((contact) => ({
            name: contact.name?.[0] || 'Unknown',
            tel: contact.tel || [], // Keep all numbers
          }))
        );

        // Optional: autofill the first number of the first contact
        const firstNumber = contacts[0]?.tel?.[0];
        if (firstNumber) {
          document.getElementById('phoneInput').value = firstNumber;
        }
      }
    } catch (err) {
      console.error('Contact selection failed', err);
    }
  };

  return (
    <div>
      <h1>Contact Picker📖</h1>
      <p>Pick from user👤 browser</p>
      <p style={{fontSize:'12px', fontStyle:'italic', marginBottom:'30px', color:'grey'}}>Note: Works on andriod/ios must be served over https</p>
      <Button variant="contained"  onClick={handlePickContact}>Pick Contact</Button>
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
