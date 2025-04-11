import React from 'react';

const ContactPicker = () => {
    const handlePickContact = async () => {
      try {
        const supported = 'contacts' in navigator && 'ContactsManager' in window;
        if (!supported) {
          alert("Contact Picker API is not supported on this browser.");
          return;
        }
  
        const props = ['tel', 'name']; // Request phone number and name
        const opts = { multiple: false };
  
        const contacts = await navigator.contacts.select(props, opts);
        if (contacts.length > 0 && contacts[0].tel.length > 0) {
          const phone = contacts[0].tel[0];
          document.getElementById("phoneInput").value = phone;
        }
      } catch (err) {
        console.error("Contact selection failed", err);
      }
    };
  
    return (
      <div>
        <input id="phoneInput" type="tel" placeholder="Enter phone number" />
        <button onClick={handlePickContact}>Pick Contact</button>
      </div>

    );
  };
  
  export default ContactPicker;
  