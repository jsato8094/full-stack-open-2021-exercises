import personService from '../services/persons'

const Persons = ({ persons, searchWord, setPersons }) => {

  const personsToShow = searchWord === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(searchWord.toLowerCase()))

  const handleDeletePerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const DeleteButton = ({ person }) => {
    return (
      <button onClick={() => handleDeletePerson(person)}>
        delete
      </button>
    )
  }

  return (
    personsToShow.map(p =>
      <div key={p.id}>
        {p.name} {p.number} <DeleteButton person={p} />
      </div>
    )
  )
}

export default Persons