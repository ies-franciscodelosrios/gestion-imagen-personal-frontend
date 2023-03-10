// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'


// ** Axios Imports
import { AddClient, ApiDelClient, getAllClientsData, getClientById, updateClientBy } from '../../../../services/api'
import { handleConfirmCancel, sort_data } from './sort_utils'

// Preguntar mañana de donde viene appClients
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

export const updateClient = createAsyncThunk('appClients/updateClient', async updatedClient => {
  console.log(updatedClient);
  await updateClientBy(updatedClient).then(() =>{toast.success('Correctamente Guardado!')}).catch(()=>{toast.error('Error al Actualizar cliente!')});
  return updatedClient
})

export const addClient = createAsyncThunk('appClients/addClient', async (user, { dispatch, getState }) => {
  await AddClient(user)
  const response = await getAllClientsData().then(result => {toast.success('Correctamente Guardado!');return result.data.users}).catch(toast.error('Error al añadir cliente!')); 
  return response
})

export const addMultipleClients = createAsyncThunk('appClients/addMultipleClient', async (users) => {
  await users.map( (user) =>{
    try {
      AddClient(user);
    } catch (error) {}
  })
  const response = await getAllClientsData().then(result => {toast.success('Correctamente Importados!'); return result.data.users}).catch(); 
  return response
})

export const deleteClient = createAsyncThunk('appClients/deleteClient', async (id, { dispatch, getState }) => {
  (await handleConfirmCancel())? await ApiDelClient(id) :'';

  const response = await getAllClientsData().then(result => {return result.data.users}) 
  return response
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
      .addCase(updateClient.fulfilled, (state, action) => {
        state.selectedClient = action.payload
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(addMultipleClients.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.allData = action.payload
      })
  }
})

export default appClientsSlice.reducer
