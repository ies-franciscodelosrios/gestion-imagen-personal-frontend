// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { getAllProfesorData, getUserById, updateUserBy, ApiDelUser,AddProfesor } from '../../../../services/api'
import { sort_data } from './sort_utils'


/* ALL PROFESOR */

 export const getAllData = createAsyncThunk('appProfesors/getAllData', async (params) => {
  const response = { "data": { "users": params.data } }
  if ((response === null || response.data.users.length <= 0) && params.q == '') {
    Object.assign(response, await getAllProfesorData().then(result => { return result }))
  }

  return response.data.users
  
}) 

/*  */

export const getData = createAsyncThunk('appProfesors/getData', async params => {
  const response = { "data": { "users": params.data } };
  if ((response === null || response.data.users.length <= 0) && params.q == '') {
    Object.assign(response, await getAllProfesorData().then(result => { return result }))
  }
  response.data.users = sort_data(params, response.data.users);
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

/* GET PROFESOR BY ID */

export const getProfesor = createAsyncThunk('appProfesors/getUser', async id => {
  const response = await getUserById(id).then(result => { return result })
  console.log(response)
  return response.data.user
})
/* ADD PROFESOR */
export const addProfesor = createAsyncThunk('appProfesors/addUserProfesor', async (user, { dispatch, getState }) => {
  await AddProfesor(user)
  console.log(user)
  const response = await getAllProfesorData().then(result => { return result.data.users })
  return response
})
/* UPDATE PROFESOR */
export const updateProfesor = createAsyncThunk('appProfesors/updateUser', async updatedUser => {
  await updateUserBy(updatedUser);
  return updatedUser
})
/* DELETE PROFESOR BY ID */

export const deleteProfesor = createAsyncThunk('appProfesors/deleteUser', async (id, { dispatch, getState }) => {
  await ApiDelUser(id)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})

export const appProfesorsSlice = createSlice({
  name: 'appProfesors',
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
      .addCase(getProfesor.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
      .addCase(updateProfesor.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
      .addCase(addProfesor.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(deleteProfesor.fulfilled, (state, action) => {
        state.allData = action.payload
      })
  }
})
export default appProfesorsSlice.reducer
