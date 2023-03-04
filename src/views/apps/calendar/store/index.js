// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

import { AddAppointment, getAllAppointments, getAllStudentsData } from '../../../../services/api'



export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async (params) => {
  const response = {"data": {"appointment": params.data}};
  if ((response === null || response.data.appointment.length <= 0 ) && params.q == '') {
     Object.assign(response, await getAllAppointments().then(response => {return response})) 
  }
  response.data.users = sort_data(params, response.data.users);
  console.log(response.data.users);
  return response.data.users;
})




export const addEvent = createAsyncThunk('appCalendar/addEvent', async (event, { dispatch, getState }) => {
  await axios.post('/apps/calendar/add-event', { event })
  await dispatch(fetchEvents(getState().calendar.selectedCalendars))
  return event
})

export const addAppointment = createAsyncThunk('appAppointments/addAppointments', async (event, { dispatch, getState }) => {
  await AddAppointment(event)
  const response = await getAllAppointments().then(result => {return result.data.event}) 
  return response
})

export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async (event, { dispatch, getState }) => {
  await axios.post('/apps/calendar/update-event', { event })
  await dispatch(fetchEvents(getState().calendar.selectedCalendars))
  return event
})

export const updateFilter = createAsyncThunk('appCalendar/updateFilter', async (filter, { dispatch, getState }) => {
  if (getState().calendar.selectedCalendars.includes(filter)) {
    await dispatch(fetchEvents(getState().calendar.selectedCalendars.filter(i => i !== filter)))
  } else {
    await dispatch(fetchEvents([...getState().calendar.selectedCalendars, filter]))
  }
  return filter
})

export const updateAllFilters = createAsyncThunk('appCalendar/updateAllFilters', async (value, { dispatch }) => {
  if (value === true) {
    await dispatch(fetchEvents(['Peluquería', 'Estética']))
  } else {
    await dispatch(fetchEvents([]))
  }
  return value
})

export const removeEvent = createAsyncThunk('appCalendar/removeEvent', async id => {
  await axios.delete('/apps/calendar/remove-event', { id })
  return id
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    selectedEvent: {},
    selectedCalendars: ['Peluquería', 'Estética']
  },
  reducers: {
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload
      })
      .addCase(updateFilter.fulfilled, (state, action) => {
        if (state.selectedCalendars.includes(action.payload)) {
          state.selectedCalendars.splice(state.selectedCalendars.indexOf(action.payload), 1)
        } else {
          state.selectedCalendars.push(action.payload)
        }
      })
      .addCase(updateAllFilters.fulfilled, (state, action) => {
        const value = action.payload
        let selected = []
        if (value === true) {
          selected = ['Peluquería', 'Estética']
        } else {
          selected = []
        }
        state.selectedCalendars = selected
      })
  }
})

export const { selectEvent } = appCalendarSlice.actions

export default appCalendarSlice.reducer
