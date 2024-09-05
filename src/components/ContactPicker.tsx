// /src/components/ContactPicker.tsx

import React, { useState } from 'react';

interface Contact {
  id?: string; // Optional: Use the ID if available
  name: string;
  phone: string;
}

const ContactPicker: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePickContacts = async () => {
    // Check if the Contact Picker API is supported
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const selectedContacts = await (navigator as any).contacts.select(['name', 'tel'], { multiple: true });
        
        // Map the selected contacts to a format for display
        const formattedContacts = selectedContacts.map((contact: any) => ({
          id: contact.id,
          name: contact.name?.[0] || 'No name',
          phone: contact.tel?.[0] || 'No phone number',
        }));

        setContacts(formattedContacts);
        setError(null);
      } catch (err) {
        console.error('Error selecting contacts:', err);
        setError('Failed to select contacts.');
      }
    } else {
      setError('Contact Picker API is not supported.');
    }
  };

  return (
    <div>
      <h2>Contact Picker</h2>
      <button onClick={handlePickContacts}>Pick Contacts</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {contacts.length > 0 && (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <strong>{contact.name}</strong>: {contact.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactPicker;
