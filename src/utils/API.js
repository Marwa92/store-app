import axios from 'axios'

const port = 'http://localhost:3001';
export default axios.create({
  baseURL: `${port}`,
  responseType: 'json',
})
