import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const create = person => {
  return axios.post(baseUrl, person).then(res => res.data)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`).then(res => res.data)
}

const update = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person)
    .then(res => res.data)
}

// eslint-disable-next-line
export default { getAll, create, remove, update }