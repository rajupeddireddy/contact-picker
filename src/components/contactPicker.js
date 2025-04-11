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
      <h1>Contact Picker📖</h1>
      <p>Pick from user👤 browser</p>
      <p style={{fontSize:'12px', fontStyle:'italic', marginBottom:'30px', color:'grey'}}>Note: Works on andriod/ios must be served over https</p>
      <Button variant="contained"  onClick={handlePickContact}>Pick Contact</Button>
      {selectedContacts.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <h3>Selected Contact(s):</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {selectedContacts.map((contact, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '10px 15px',
                  marginBottom: '10px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <strong>{contact.name}</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                  {contact.tel.map((number, idx) => (
                    <li key={idx} style={{ fontSize: '14px', color: '#333' }}>
                      {number}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactPicker;
