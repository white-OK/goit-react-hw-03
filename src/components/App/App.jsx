import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import './App.css';

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedObjects = localStorage.getItem('saved-contacts');
    if (savedObjects !== null) {
      const parseData = JSON.parse(savedObjects);
      return parseData;
    }
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });

  const [search, setSearch] = useState('');
  useEffect(() => {
    localStorage.setItem('saved-contacts', JSON.stringify(contacts));
  }, [contacts]);
  const debouncedSearch = useDebounce(search || '', 500);

  const visibleContacts = useMemo(() => {
    if (!debouncedSearch || typeof debouncedSearch !== 'string')
      return contacts;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [contacts, debouncedSearch]);

  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      return [...prevContacts, newContact];
    });
  };
  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={search} onSearch={setSearch} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
}

export default App;
