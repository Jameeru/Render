// src/utils/idbUtils.ts

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
    db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
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
