// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Axios Imports
import {getAllStudentsData, getUserById, updateUserBy, ApiDelUser, AddStudent, getAllAppointments  } from '../../../../services/api'
import { handleConfirmCancel, sort_appointments, sort_data } from './sort_utils'
import '@styles/react/libs/react-select/_react-select.scss'
import { toast } from 'react-hot-toast'


export const getAllData = createAsyncThunk('appUsers/getAllData', async (params) => {
  const response = {"data": {"data": params.data}} 
  if ((response === null || response.data.data.length <= 0 ) && params.q == '') {
    Object.assign(response, await getAllStudentsData().then(result => {return result}).catch(console.log('error joselu')))
  }
  return response.data.data
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = {"data": {"data": params.data}}; 
  if ((response === null || response.data.data.length <= 0 ) && params.q == '') {
    Object.assign(response, await getAllStudentsData().then(result => {return result}).catch(console.log('error joselu')))
  }
  response.data.data = sort_data(params, response.data.data);
  return {
    params,
    data: response.data.data,
    totalPages: response.data.total
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await getUserById(id).then(result => {return result})
  return response.data.data
})

/* GET ALL APPOINTMENTS */

export const getAppointments = createAsyncThunk('appAppointments/getAppointments', async (params) => {
  const response = await getAllAppointments().then(result => { return result })
  response.data.users = sort_appointments(params, response.data.users);

  return response.data.users
})

export const updateUser = createAsyncThunk('appUsers/updateUser', async updatedUser => {
  await updateUserBy(updatedUser).then(e => toast.success('Datos Guardados')).catch(e=>{toast.error('Error al editar')});
  return updatedUser
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await AddStudent(user)
  const response = await getAllStudentsData().then(result => {return result.data.data})
  return response
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  (await handleConfirmCancel())? await ApiDelUser(id) :'';
  const response = await getAllStudentsData().then(result => {return result.data.data}) 
  return response
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    appoitments: [],
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
      .addCase(updateUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.appoitments = action.payload
      })
  }
})

export default appUsersSlice.reducer