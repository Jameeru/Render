import React, { useState, useEffect } from 'react';
import ContactPicker from './components /ContactPicker';
import ContactList from './components /ContactList';
import { addContact, getContacts, deleteContact, updateContact } from './services/indexedDbUtils';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsList = await getContacts();
      setContacts(contactsList as unknown as Contact[]);
    };

    fetchContacts();
  }, []);

  const handleAddContact = async () => {
    if (name && phoneNumber) {
      await addContact({ name, phoneNumber });
      const updatedContacts = await getContacts();
      setContacts(updatedContacts as unknown as Contact[]);
      setName('');
      setPhoneNumber('');
    }
  };

  const handleUpdateContact = async (id: number) => {
    const contactToUpdate = contacts.find(contact => contact.id === id);
    if (contactToUpdate) {
      setSelectedContactId(id);
      setName(contactToUpdate.name);
      setPhoneNumber(contactToUpdate.phone);
    }
  };

  const handleSaveUpdate = async () => {
    if (selectedContactId !== null && name && phoneNumber) {
      await updateContact(selectedContactId, { name, phoneNumber });
      const updatedContacts = await getContacts();
      setContacts(updatedContacts as unknown as Contact[]);
      setSelectedContactId(null);
      setName('');
      setPhoneNumber('');
    }
  };

  const handleDeleteContact = async (id: number) => {
    await deleteContact(id);
    const updatedContacts = await getContacts();
    setContacts(updatedContacts as unknown as Contact[]);
  };

  const handleCancelUpdate = () => {
    setSelectedContactId(null);
    setName('');
    setPhoneNumber('');
  };

  return (
    <div className="container">
      <h1>Contact Manager</h1>
      <ContactPicker />

      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {selectedContactId ? (
          <>
            <button onClick={handleSaveUpdate}>Save Update</button>
            <button onClick={handleCancelUpdate}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAddContact}>Add Contact</button>
        )}
      </div>

      <ContactList 
        contacts={contacts} 
        onDelete={handleDeleteContact} 
        onUpdate={handleUpdateContact} 
      />
    </div>
  );
};

export default App;
