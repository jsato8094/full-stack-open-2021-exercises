const Filter = ({ word, handleWordChange }) => {
  return (
    <div>
        filter shown with <input value={word} onChange={handleWordChange} />
    </div>
  )
}

export default Filter