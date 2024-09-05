// /src/App.tsx

import React, { useState, useEffect } from 'react';
import ContactPicker from './components/ContactPicker';
import ContactList from './components/ContactList';
import { getContacts } from './services/indexedDbUtils';

const App: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsList = await getContacts();
      setContacts(contactsList);
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <ContactPicker />
      <ContactList contacts={contacts} />
    </div>
  );
};

export default App;
