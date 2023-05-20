// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'


// ** Axios Imports
import { AddClient, ApiDelClient, getAllClientsData, getClientById, updateClientBy } from '../../../../services/api'
import { handleConfirmCancel, sort_data } from './sort_utils'

// Preguntar mañana de donde viene appClients
export const getAllData = createAsyncThunk('appClients/getAllData', async (params) => {
  const response = {"data": {"data": params.data}} 
  if ((response === null || response.data.data.length <= 0 ) && params.q == '') {
    Object.assign(response, await getAllClientsData().then(result => {return result})) 
  }
  return response.data.data
})

export const getData = createAsyncThunk('appClients/getData',  async params => {
  const response = {"data": {"data": params.data}};
  if ((response === null || response.data.data.length <= 0 ) && params.q == '') {
     Object.assign(response, await getAllClientsData().then(result => {return result})) 
  }
  Object.assign(response, sort_data(params, response));
  return {
    params,
    data: response.data.data,
    totalPages: response.data.total
  }
})

export const getClient = createAsyncThunk('appClients/getClient', async id => {
  const response = await getClientById(id).then(result => {return result})
  return response.data.data
})

export const updateClient = createAsyncThunk('appClients/updateClient', async updatedClient => {
  console.log(updatedClient);
  await updateClientBy(updatedClient).then(() =>{toast.success('Correctamente Guardado!')}).catch(()=>{toast.error('Error al Actualizar cliente!')});
  return updatedClient
})

export const addClient = createAsyncThunk('appClients/addClient', async (user) => {
  await AddClient(user).then(() => {toast.success('Correctamente Guardado!')})
  const response = await getAllClientsData().then(result => {return result.data.data}).catch(); 
  return response
})

export const addMultipleClients = createAsyncThunk('appClients/addMultipleClient', async (data) => {
  let response = null;
  const loading = toast.loading('Cargando Datos');
  try {
        await data.map( async(user) =>{
          await AddClient(user);
        })
  } catch (error) {
    toast.error('Error al Importar', {
      id: loading,
    });
  }finally{
    response = await getAllClientsData().then(result => { return result.data.data}).catch(); 
    toast.success('Correctamente Importados', {
      id: loading,
    });
    
  }
  return response
})

export const deleteClient = createAsyncThunk('appClients/deleteClient', async (id, { dispatch, getState }) => {
  (await handleConfirmCancel())? await ApiDelClient(id) :'';

  const response = await getAllClientsData().then(result => {return result.data.data}) 
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
        action.payload? state.allData = action.payload : '';
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.allData = action.payload
      })
  }
})

export default appClientsSlice.reducer
