// /src/components/ContactList.tsx

import React from 'react';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface ContactListProps {
  contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  return (
    <div>
      <h3>Contact List</h3>
      {contacts.length === 0 ? (
        <p>No contacts available</p>
      ) : (
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

export default ContactList;
