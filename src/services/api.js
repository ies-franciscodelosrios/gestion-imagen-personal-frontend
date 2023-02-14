import Axios from 'axios'
import { getToken } from './UseToken'

const ApiConnect = Axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

export async function ApiLogin(email, password) {
  return await ApiConnect.post('login', {
    email,
    password,
    device: 'navigator'
  })
}


export const getAllUserData = async (loginEmail) => {
  return await ApiConnect.get(`userByCorreo/${loginEmail}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function ApiLogout() {
  return await ApiConnect.get('logout', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function ApiGetUser() {
  return await ApiConnect.get('users', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function ApiGetBooks(page) {
  return await ApiConnect.get('v1/books?page=' + page.toString(), {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function ApiGetBook(id) {
  return await ApiConnect.get('v1/books/' + id, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function ApiAddBook(book) {
  return await ApiConnect.post(
    'v1/books',
    {
      title: book.title,
      description: book.description
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    }
  )
}

export async function ApiUpdateBook(book) {
  return await ApiConnect.put(
    'v1/books/' + book.id,
    {
      title: book.title,
      description: book.description
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${getToken()}`
      }
    }
  )
}

export async function ApiDelBook(id) {
  return await ApiConnect.delete('v1/books/' + id, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`
    }
  })
}
