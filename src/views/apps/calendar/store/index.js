// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';
import {
  AddAppointment,
  deleteAppointment,
  getAllAppointments,
  getAllClientsData,
  getAllStudentsData,
  getClientByData,
  getUserByDNI,
  updateAppointment
} from '../../../../services/api';
import { findUser } from './sort_utils';

export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async (calendars) => {

  const appointmentList = calendars.events;
  console.log(appointmentList),

    console.log(calendars);
    const studentList = calendars.users;
    const clientList = calendars.clients;
    const filtros = calendars.calendarLabel;
    console.log(calendars.events.calendarLabel==filtros);
    if (calendars.events === null || calendars.events.length <= 0) {

      const students = await getAllStudentsData().then(result => {return result}).catch(() =>{console.log('error all student')});
      const clients = await getAllClientsData().then(result => {return result}).catch(() =>{console.log('error all client')});
      Object.assign(studentList, students.data.users.map((alumno) => ({
        value: `${alumno.Name} ${alumno.Surname}`,
        label: `${alumno.Name} ${alumno.Surname}`,
        dni: alumno.DNI,
        avatar: 'img5',
      })));
      Object.assign(clientList ,clients.data.users.map((cliente) => ({
        value: `${cliente.Name} ${cliente.Surname}`,
        label: `${cliente.Name} ${cliente.Surname}`,
        dni: cliente.DNI,
        avatar: 'img5',
      })));

      const appointments = await getAllAppointments().then(result => {return result}).catch(() => {console.log('error all apointments')});
      Object.assign(appointmentList, await appointments.data.users.map(event => {
        const alumnoPromise = {};
        Object.assign(alumnoPromise, findUser(event.DNI_Student, students.data.users));
        const clientePromise = {};
        Object.assign(clientePromise, findUser(event.DNI_client, clients.data.users));

        return {
          id: event.id,
          start: event.Date,
          title: event.Protocol,
          calendarLabel: event.Treatment,
          created_at: event.created_at,
          allDay: true,
          color: event.Treatment == 0?'#FFB6B9':'#A6E4D9',
          editable: true,
          description: event.Consultancy,
          alumno: {
            value: `${alumnoPromise.Name} ${alumnoPromise.Surname}`,
            label: `${alumnoPromise.Name} ${alumnoPromise.Surname}`,
            dni: alumnoPromise.DNI,
            avatar: '',
          },
          cliente: {
            value: `${clientePromise.Name} ${clientePromise.Surname}`,
            label: `${clientePromise.Name} ${clientePromise.Surname}`,
            dni: clientePromise.DNI,
            avatar: '',
          },
          backgroundColor: event.Treatment == 0? '#FFB6B9':'#A6E4D9',
        };
      }) )
    }
    
      // Filtrar las citas según el valor de calendarLabel
  const filteredAppointments = appointmentList.filter(
    (event) => calendars.calendarLabel.includes(event.calendarLabel)
  );

  return {
    events: filteredAppointments,
    filteredEvents: filteredAppointments,
    users: studentList,
    clients: clientList,
    calendarLabel: calendars.calendarLabel,
  };  
  }
);


export const addEvent = createAsyncThunk(
  'appCalendar/addEvent',
  async (event, { dispatch, getState }) => {
    console.log(event);
    const newEvent = await AddAppointment(event);
    const currentFilters = getState().calendar.calendarLabel;
    await dispatch(fetchEvents({ events: [], users: [], clients: [], calendarLabel: currentFilters }));
    return newEvent;
  }
);

export const updateEvent = createAsyncThunk(
  'appCalendar/updateEvent',
  async (event, { dispatch, getState }) => {
    console.log(event);
    await updateAppointment(event);
    const currentFilters = getState().calendar.calendarLabel;
    await dispatch(fetchEvents({ events: [], users: [], clients: [], calendarLabel: currentFilters }));
    return event;
  }
);




export const updateFilter = createAsyncThunk(
  'appCalendar/updateFilter',
  async (filter, { dispatch, getState }) => {
    const state = getState();
    const selectedCalendars = state.calendar.selectedCalendars;
    
    let updatedSelectedCalendars;
    
    if (selectedCalendars.includes(filter)) {
      updatedSelectedCalendars = selectedCalendars.filter((i) => i !== filter);
    } else {
      updatedSelectedCalendars = [...selectedCalendars, filter];
    }
    console.log(updatedSelectedCalendars);
    await dispatch(fetchEvents({ events: [], users: [], clients: [], calendarLabel: updatedSelectedCalendars }));
    return { updatedSelectedCalendars };
  }
);




export const updateAllFilters = createAsyncThunk(
  'appCalendar/updateAllFilters',
  async (value, { dispatch }) => {
    if (value === true) {
      await dispatch(
        fetchEvents({ events: [], users: [], clients: [], calendarLabel: [0, 1] })
      );
    } else {
      await dispatch(fetchEvents({ events: [], users: [], clients: [], calendarLabel: [] }));
    }
    return value;
  }
);



export const removeEvent = createAsyncThunk(
  'appCalendar/removeEvent',
  async (id, { dispatch, getState }) => {
    await deleteAppointment(id);
    const currentFilters = getState().calendar.calendarLabel;
    await dispatch(fetchEvents({ events: [], users: [], clients: [], calendarLabel: currentFilters }));
    
    return id;
  }
);



export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    users: [],
    clients: [],
    events: [],
    filteredEvents: [],
    selectedEvent: {},
    selectedCalendars: [0, 1],
    calendarLabel:[0, 1]
  },
  
  reducers: {
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(addEvent.fulfilled, (state, action) => {
      state.events.push(action.payload);
    })
    .addCase(updateEvent.fulfilled, (state, action) => {
      const updatedEventIndex = state.events.findIndex(event => event.id === action.payload.id);
      if (updatedEventIndex !== -1) {
        state.events[updatedEventIndex] = action.payload;
      }
    })
    .addCase(removeEvent.fulfilled, (state, action) => {
      const removeEventIndex = state.events.findIndex(event => event.id === action.payload);
      if (removeEventIndex !== -1) {
        state.events.splice(removeEventIndex, 1);
      }
    })            
    .addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload.events;
      state.filteredEvents = action.payload.filteredEvents;
      state.users = action.payload.users;
      state.clients = action.payload.clients;
      state.calendarLabel = action.payload.calendarLabel;
    })
    
  .addCase(updateFilter.fulfilled, (state, action) => {
    state.selectedCalendars = action.payload.updatedSelectedCalendars;
  })
  .addCase(updateAllFilters.fulfilled, (state, action) => {
    const value = action.payload;
    let selected = [];
    if (value === true) {
      selected = [0, 1];
    } else {
      selected = [];
    }
    state.selectedCalendars = selected;
  });
  },
});

export const { selectEvent } = appCalendarSlice.actions;

export default appCalendarSlice.reducer;
