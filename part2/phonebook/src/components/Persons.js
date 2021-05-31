const Persons = ({ persons }) => {
  return (
    persons.map(p =>
      <div key={p.name}>{p.name} {p.number}</div>
    )
  )
}

export default Persons