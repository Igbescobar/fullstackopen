import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, id: getId(), votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const addVote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    const objectToChange = response.data
    const updatedAnecdote = { ...objectToChange, votes: objectToChange.votes + 1 }
    const request = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    console.log(request.data)
    return request.data
}
// eslint-disable-next-line
export default { getAll, createNew, addVote }