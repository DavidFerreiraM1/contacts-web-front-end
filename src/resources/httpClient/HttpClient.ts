import axios from 'axios';

const HttpClient = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
    accpt: 'application/json',
  },
});

export default HttpClient;
