import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const next = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const vote = () => {
    const copied = [...votes]
    copied[selected] += 1
    setVotes(copied)
  }

  const mostVoted = votes.map((x, i) => [x, i]).reduce((a, b) => a[0] < b[0] ? b : a)[1]

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {votes.reduce((a, b) => a + b)} votes
      <br />
      <Button handleClick={vote} text="vote" />
      <Button handleClick={next} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVoted]}
      <br />
      has {votes[mostVoted]} votes
    </div>
  )
}

export default App