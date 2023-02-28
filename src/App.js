import React, { useState } from 'react'
import './App.css';
import contactsDB from './contacts.json'

function App() {

  const [contacts, setContacts] = useState(contactsDB.slice(0,5))

  const handleAddContact = () => {
    const randomContact = contactsDB[Math.floor(Math.random() * contactsDB.length)];
    const contactExists = contacts.some(contact => contact.id === randomContact.id);
    if (!contactExists) {
      const copy = [...contacts];
      copy.push(randomContact);
      setContacts(copy);
    }
  }

  const handleByName = () => {
    const copy = [...contacts]
    copy.sort((a, b) => a.name.localeCompare(b.name))
    setContacts(copy)
  }

  const handleByPopularity = () => {
    const copy = [...contacts]
    copy.sort((a, b) => b.popularity - a.popularity)
    setContacts(copy)
  }

  const handleDelete = (id) => {
    const newList = contacts.filter((contact) => contact.id !== id)
    setContacts(newList)
  }

  return (

    <div className="App">
      <h1>✨ IronCelebrities ✨</h1>

    <div className="button">
      <button onClick={handleAddContact}> <i class="fa-solid fa-plus"></i> Add Random Celebrity </button>
      <button onClick={handleByName}> <i class="fa-solid fa-arrow-down-a-z"></i> Sort by Name </button>
      <button onClick={handleByPopularity}> <i class="fa-solid fa-ranking-star"></i> Sort by Popularity </button>
    </div>

        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won an Oscar</th>
              <th>Won an Emmy</th>
              <th>Actions</th>
            </tr>
          </thead>

          {contacts.map((contact) => {
          return (
            <tbody key={contact.name}>
            <tr>
              <td><img src={contact.pictureUrl} alt={contact.name} width={100}/></td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? '🏆' : ''}</td>
              <td>{contact.wonEmmy ? '🏆' : ''}</td>
              <td><button className='delete-btn' onClick={() => handleDelete(contact.id)}><i class="fa-regular fa-trash-can"></i> Delete</button></td>
            </tr>
          </tbody>
          )
          })}
        </table>
    </div>

  )
}

export default App
