// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Axios Imports
import { AddClient, ApiDelClient, getAllClientsData, getClientById } from '../../../../services/api'
import { sort_data } from './sort_utils'


export const getAllData = createAsyncThunk('appUsers/getAllData', async (params) => {
  const response = {"data": {"users": params.data}} 
  if ((response === null || response.data.users.length <= 0 ) && params.q == '') {
    Object.assign(response, await getAllClientsData().then(result => {return result})) 
    console.log('peticion');
 }
  return response.data.users
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = {"data": {"users": params.data}};
  if ((response === null || response.data.users.length <= 0 ) && params.q == '') {
     Object.assign(response, await getAllClientsData().then(result => {return result})) 
     console.log('peticion');
  }
  console.log(params);
  response.data.users = sort_data(params, response.data.users);
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await getClientById(id).then(result => {return result})
  return response.data.users
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await AddClient(user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await ApiDelClient(id)
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
