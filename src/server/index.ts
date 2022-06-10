import axios from 'axios'

const server = axios.create({
    baseURL: 'http://39.108.233.164:8889',
})

export const getApiList = () => server.get('/api/list').then((res) => res.data)
