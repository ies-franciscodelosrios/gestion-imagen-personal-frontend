// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { data } from 'jquery'

let array = [
  {
    id: 1,
    name: "Eladio Cañizares-Zabala",
    email: "Eladio@gmail.com",
    curso: "2",
    ciclo: "DAW"
  }, {
    id: 2,
    name: "Cleto Cabañas-Vall",
    email: "Cleto@gmail.com",
    curso: "2",
    ciclo: "DAW"
  }, {
    id: 3,
    name: "Olegario Llobet",
    email: "Olegario@gmail.com",
    curso: "2",
    ciclo: "DAW"
  }, {
    id: 4,
    name: "Matías Tirado Adadia",
    email: "Matías@gmail.com",
    curso: "2",
    ciclo: "DAW"
  }, {
    id: 5,
    name: "Calista Colomer Echeverrí",
    email: "Calista@gmail.com",
    curso: "2",
    ciclo: "DAW"
  }, {
    id: 6,
    name: "Gustavo Pareja",
    email: "Gustavo@gmail.com",
    curso: "2",
    ciclo: "DAW"
  }, {
    id: 7,
    name: "Albino Figuerola Granados",
    email: "Albino@gmail.com",
    curso: "2",
    ciclo: "DAW"
  }, {
    id: 8,
    name: "Adriana Guzmán Yáñez",
    email: "Adriana@gmail.com",
    curso: "2",
    ciclo: "DAW"
  }, {
    id: 9,
    name: "Cristóbal Neira Gomis",
    email: "Cristobal@gmail.com",
    curso: "2",
    ciclo: "DAW"
  }, {
    id: 10,
    name: "Edu Higueras Jáuregui",
    email: "Edu@gmail.com",
    curso: "2",
    ciclo: "DAW"
  }, {
    id: 11,
    name: "Ester Graciela Ripoll Garriga",
    email: "Ester@gmail.com",
    curso: "2",
    ciclo: "DAW"
  },
  {
    id: 12,
    name: "Ester Graciela Ripoll Garriga",
    email: "Ester@gmail.com",
    curso: "2",
    ciclo: "DAW"
  },
  {
    id: 13,
    name: "Ester Graciela Ripoll Garriga",
    email: "Ester@gmail.com",
    curso: "2",
    ciclo: "DAW"
  },
]

export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await axios.get('/api/users/list/all-data')
  return array
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.get('/api/users/list/data', params)
  return {
    params,
    data: array,
    totalPages: array.length
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get('/api/users/user', { id })
  return response.data.user
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {

  let newData = array.map((item) =>
    Object.assign({}, item, { selected: false })
  )
  newData.push(user)

console.log(newData)
array=newData
  /*
  await axios.post('/apps/users/add-user', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())*/

   return newData
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/users/delete', { id })
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
