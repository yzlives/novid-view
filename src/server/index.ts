import axios from 'axios'

const server = axios.create({
    baseURL: 'http://localhost:8080',
})

export const getApiList = () => server.get('/api/list').then((res) => res.data)
