import { openDB, DBSchema } from 'idb';

interface ContactSchema extends DBSchema {
  contacts: {
    key: number;
    value: { name: string; phoneNumber: string };
    indexes: { 'by-name': string };
  };
}

const dbPromise = openDB<ContactSchema>('contacts-db', 1, {
  upgrade(db) {
    const store = db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
    store.createIndex('by-name', 'name');
  },
});

export const addContact = async (contact: { name: string; phoneNumber: string }) => {
  const db = await dbPromise;
  await db.add('contacts', contact);
};

export const getContacts = async () => {
  const db = await dbPromise;
  return db.getAll('contacts');
};

export const deleteContact = async (id: number) => {
  const db = await dbPromise;
  await db.delete('contacts', id);
};

export const updateContact = async (id: number, updatedContact: { name: string; phoneNumber: string }) => {
  const db = await dbPromise;
  const tx = db.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');
  const contact = await store.get(id);
  if (contact) {
    contact.name = updatedContact.name;
    contact.phoneNumber = updatedContact.phoneNumber;
    await store.put(contact);
  }
  await tx.done;
};
