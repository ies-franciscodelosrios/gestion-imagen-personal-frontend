// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Axios Imports
import axios from 'axios'

import { getAllProfesorData, getUserById, updateUserBy, ApiDelUser,AddProfesor, getAllAppointments } from '../../../../services/api'
import {handleConfirmCancel, sort_appointments, sort_data } from './sort_utils'
import { toast } from 'react-hot-toast'



/* ALL PROFESOR */

 export const getAllData = createAsyncThunk('appProfesors/getAllData', async (params) => {
  const response = { "data": { "data": params.data } }
  if ((response === null || response.data.data.length <= 0) && params.q == '') {
    Object.assign(response, await getAllProfesorData().then(result => { return result }))
  }

  return response.data.data
  
}) 

/*  */

export const getData = createAsyncThunk('appProfesors/getData', async params => {
  const response = { "data": { "data": params.data } };
  if ((response === null || response.data.data.length <= 0) && params.q == '') {
    Object.assign(response, await getAllProfesorData().then(result => { return result }))
  }
  response.data.data = sort_data(params, response.data.data);
  return {
    params,
    data: response.data.data,
    totalPages: response.data.total
  }
})

/* GET PROFESOR BY ID */

export const getProfesor = createAsyncThunk('appProfesors/getUser', async id => {
  const response = await getUserById(id).then(result => { return result })
  console.log(response)
  console.log(response.data.data)

  return response.data.data
})

/* GET ALL APPOINTMENTS */

export const getAppointments = createAsyncThunk('appAppointments/getAppointments', async (params) => {
  const response = await getAllAppointments().then(result => { return result })
  console.log(response)
  response.data.data = sort_appointments(params, response.data.data);

  return response.data.data
})

/* */



/* ADD PROFESOR */
export const addProfesor = createAsyncThunk('appProfesors/addUserProfesor', async (user, { dispatch, getState }) => {
  await AddProfesor(user)
  console.log(user)
  const response = await getAllProfesorData().then(result => { return result.data.data })
  return response
})
/* UPDATE PROFESOR */
export const updateProfesor = createAsyncThunk('appProfesors/updateUser', async updatedUser => {
  await updateUserBy(updatedUser).then(e => toast.success('Datos Guardados')).catch(e=>toast.error('Error al editar'));
  return updatedUser
})
/* DELETE PROFESOR BY ID */

export const deleteProfesor = createAsyncThunk('appProfesors/deleteUser', async (id, { dispatch, getState }) => {
  (await handleConfirmCancel())? await ApiDelUser(id) :'';
  const response = await getAllProfesorData().then(result => {return result.data.data}) 
  return response
  /* await ApiDelUser(id) 
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id */
})

export const appProfesorsSlice = createSlice({
  name: 'appProfesors',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    appoitments: [],
    selectedProfesor: null
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
        state.selectedProfesor = action.payload
      })
      .addCase(updateProfesor.fulfilled, (state, action) => {
        state.selectedProfesor = action.payload
      })
      .addCase(addProfesor.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(deleteProfesor.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.appoitments = action.payload
      })
  }
})
export default appProfesorsSlice.reducer
