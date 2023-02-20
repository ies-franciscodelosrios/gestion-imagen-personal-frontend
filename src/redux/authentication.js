// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
import { getToken } from '../services/UseToken'


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
      console.log(state['accessToken']);
      state['refreshToken'] = action.payload['refreshToken']
      localStorage.setItem('userData', JSON.stringify(action.payload))
      localStorage.setItem('accessToken', JSON.stringify(getToken()))
      localStorage.setItem('refreshToken', JSON.stringify(getToken()))
      console.log(state);
    },
    handleLogout: state => {
      state.userData = {}
      state['accessToken'] = null
      state['refreshToken'] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
