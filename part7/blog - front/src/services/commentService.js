import axios from "axios";
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/comments`)
    return response.data
}

const create = async (id, newComment) => {
    const comment = { content: newComment }
    const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
    return response.data
}

export default {
    getAll,
    create
}