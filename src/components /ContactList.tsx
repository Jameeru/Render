import React from 'react';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onDelete, onUpdate }) => {
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
              <button onClick={() => onDelete(contact.id)}>Delete</button>
              <button onClick={() => onUpdate(contact.id)}>Update</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
