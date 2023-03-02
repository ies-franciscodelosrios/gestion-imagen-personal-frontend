// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { getAllProfesorData, getUserById ,ApiDelUser } from '../../../../services/api'

/* ALL PROFESOR */

export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await getAllProfesorData().then(result => {return result}) 
  return response.data.users
})

/*  */

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await getAllProfesorData().then(result => {return result})
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

/* GET USER BY ID */

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await getUserById(id).then(result => {return result})
  console.log(response)
  return response.data.user
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/apps/users/add-user', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})

/* DELETE USER BY ID */

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await ApiDelUser(id)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appUsersSlice.reducer
