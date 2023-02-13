import Axios from 'axios'

const ApiConnect = Axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-type': 'application/json'
  }
})

export async function ApiGetToken(email, password) {
  return await ApiConnect.post('login', {
    email,
    password,
    device: navigator.userAgent
  })
}