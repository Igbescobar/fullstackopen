import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log('this is the new blog', response.data)
  return response.data
}

const update = async (updatedBlogData) => {
  try {
    const response = await axios.put(`${baseUrl}/${updatedBlogData.id}`, updatedBlogData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
}


export default { getAll, create, update, remove, setToken }