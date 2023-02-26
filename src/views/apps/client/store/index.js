// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Axios Imports
import { AddClient, ApiDelClient, getAllClientsData, getClientById } from '../../../../services/api'
import { sort_data } from './sort_utils'


export const getAllData = createAsyncThunk('appClients/getAllData', async (params) => {
  const response = {"data": {"users": params.data}} 
  if ((response === null || response.data.users.length <= 0 ) && params.q == '') {
    Object.assign(response, await getAllClientsData().then(result => {return result})) 
 }
  return response.data.users
})


export const getData = createAsyncThunk('appClients/getData', async params => {
  const response = {"data": {"users": params.data}};
  if ((response === null || response.data.users.length <= 0 ) && params.q == '') {
     Object.assign(response, await getAllClientsData().then(result => {return result})) 
  }
  response.data.users = sort_data(params, response.data.users);
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

export const getClient = createAsyncThunk('appClients/getClient', async id => {
  const response = await getClientById(id).then(result => {return result})
  return response.data.users
})

export const addUser = createAsyncThunk('appClients/addClient', async (user, { dispatch, getState }) => {
  await AddClient(user)
  await dispatch(getAllData())
  await dispatch(getData(getState().users.params))
  return user
})

export const deleteUser = createAsyncThunk('appClients/deleteClient', async (id, { dispatch, getState }) => {
  await ApiDelClient(id)
  await dispatch(getAllData())
  await dispatch(getData(getState().users.params))
  return id
})

export const appClientsSlice = createSlice({
  name: 'appClients',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedClient: null
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
      .addCase(getClient.fulfilled, (state, action) => {
        state.selectedClient = action.payload
      })
  }
})

export default appClientsSlice.reducer
