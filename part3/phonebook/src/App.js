import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService  from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchWord, setSearchWord ] = useState('')
  const [ message, setMessage ]  = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons) )
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleWordChange = (event) => setSearchWord(event.target.value)

  const setMessageDeletionTimer = () => setTimeout(() => setMessage(null), 3000)

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!persons.map(p => p.name).includes(newName)) {
      personService
        .create(personObject)
        .then(returned => {
          setPersons(persons.concat(returned))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${returned.name}`)
          setMessageDeletionTimer()
        })
        .catch(error => {
          console.log(error.response.data)
          setMessage(`${JSON.stringify(error.response.data)}`)
          setMessageDeletionTimer()
        })
    } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const idToBeUpdated = persons.filter(p => p.name === newName)[0].id
      personService
        .update(idToBeUpdated, personObject)
        .then(returned => {
          setPersons(persons.map(p => p.id === returned.id ? returned : p))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${returned.name}`)
          setMessageDeletionTimer()
        })
        .catch(error => {
          console.log(error.response.data)
          setMessage(`${JSON.stringify(error.response.data)}`)
          setMessageDeletionTimer()
        })
    } else {
      console.log(`${newName} is already added to phonebook, do nothing`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter word={searchWord} handleWordChange={handleWordChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} searchWord={searchWord} setPersons={setPersons} />
    </div>
  )
}

export default App  