// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
import { getToken } from '../services/UseToken'
import { apiLogout } from '../services/api'


const initialUser = () => {
  const item = window.localStorage.getItem('userData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser()
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload
      state['accessToken'] = action.payload[getToken()]
      state['refreshToken'] = action.payload['refreshToken']
      localStorage.setItem('userData', JSON.stringify(action.payload))
      localStorage.setItem('accessToken', JSON.stringify(getToken()))
      localStorage.setItem('refreshToken', JSON.stringify(getToken()))
    },
    handleLogout: state => {
      apiLogout().then(response => response.data)
      state.userData = {}
      state['accessToken'] = null
      state['refreshToken'] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('token')
      localStorage.removeItem('stadistics')
      localStorage.removeItem('refreshToken')
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
