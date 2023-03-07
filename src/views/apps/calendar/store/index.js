// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';
import {
  getAllAppointments,
  getAllClientsData,
  getAllStudentsData,
  getClientByData,
  getUserByDNI,
} from '../../../../services/api';

export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async (calendars) => {
    var appointmentList = calendars.events;
    var userList = calendars.users;
    var clientList = calendars.clients;

    if (calendars.events === null || calendars.events.length <= 5) {   
      console.log('peticion');   
      const users = await getAllStudentsData();
      const clients = await getAllClientsData();
      userList = users.data.users.map((alumno) => ({
        value: `${alumno.Name} ${alumno.Surname}`,
        label: `${alumno.Name} ${alumno.Surname}`,
        dni: alumno.DNI,
        avatar: 'img5',
      }));
      clientList = clients.data.users.map((cliente) => ({
        value: `${cliente.Name} ${cliente.Surname}`,
        label: `${cliente.Name} ${cliente.Surname}`,
        dni: cliente.DNI,
        avatar: 'img5',
      }));

      const appointments = await getAllAppointments();

      appointmentList = appointments.data.users.map((event) => {
        const alumnoPromise = getUserByDNI(event.DNI_Student).then(
          (response) => response.data.users
        );
        const clientePromise = getClientByData(event.DNI_client).then(
          (response) => response.data.users
        );

        return {
          id: event.id,
          start: event.Date,
          title: event.Protocol,
          calendarLabel: event.Treatment,
          created_at: event.created_at,
          allDay: true,
          color: '#FAE3D9',
          editable: true,
          description: event.Consultancy,
          alumno: alumnoPromise.then((alumno) => ({
            value: `${alumno.Name} ${alumno.Surname}`,
            label: `${alumno.Name} ${alumno.Surname}`,
            dni: alumno.DNI,
            avatar: '',
          })),
          cliente: clientePromise.then((cliente) => ({
            value: `${cliente.Name} ${cliente.Surname}`,
            label: `${cliente.Name} ${cliente.Surname}`,
            dni: cliente.DNI,
            avatar: '',
          })),
          backgroundColor: '#FAE3D9',
        };
      });
    }
    console.log(status.events)
    return {
      events: appointmentList,
      users: userList,
      clients: clientList
    };
  }
);

export const addEvent = createAsyncThunk(
  'appCalendar/addEvent',
  async (event, { dispatch, getState }) => {
    await AddAppointment({ event });
    await dispatch(
      fetchEvents({ events: state.events, users: undefined, clients: undefined })
    );
    return event;
  }
);

export const updateEvent = createAsyncThunk(
  'appCalendar/updateEvent',
  async (event, { dispatch, getState }) => {
    await axios.post('/apps/calendar/update-event', { event });
    await dispatch(fetchEvents(getState().calendar.selectedCalendars));
    return event;
  }
);

export const updateFilter = createAsyncThunk(
  'appCalendar/updateFilter',
  async (filter, { dispatch, getState }) => {
    if (getState().calendar.selectedCalendars.includes(filter)) {
      await dispatch(
        fetchEvents(
          getState().calendar.selectedCalendars.filter((i) => i !== filter)
        )
      );
    } else {
      await dispatch(
        fetchEvents([...getState().calendar.selectedCalendars, filter])
      );
    }
    return filter;
  }
);

export const updateAllFilters = createAsyncThunk(
  'appCalendar/updateAllFilters',
  async (value, { dispatch }) => {
    if (value === true) {
      await dispatch(
        fetchEvents(['Peluquería', 'Business', 'Estética', 'Holiday', 'ETC'])
      );
    } else {
      await dispatch(fetchEvents([]));
    }
    return value;
  }
);

export const removeEvent = createAsyncThunk(
  'appCalendar/removeEvent',
  async (id) => {
    await axios.delete('/apps/calendar/remove-event', { id });
    return id;
  }
);

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    users: [],
    clients: [],
    events: [],
    selectedEvent: {},
    selectedCalendars: ['Peluquería', 'Business', 'Estética', 'Holiday', 'ETC'],
  },
  reducers: {
    selectEvent: (state, action) => {
      console.log(action.payload);
      state.selectedEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload.events;
        state.users = action.payload.users;
        state.clients = action.payload.clients;
      })
      .addCase(updateFilter.fulfilled, (state, action) => {
        if (state.selectedCalendars.includes(action.payload)) {
          state.selectedCalendars.splice(
            state.selectedCalendars.indexOf(action.payload),
            1
          );
        } else {
          state.selectedCalendars.push(action.payload);
        }
      })
      .addCase(updateAllFilters.fulfilled, (state, action) => {
        const value = action.payload;
        let selected = [];
        if (value === true) {
          selected = ['Peluquería', 'Business', 'Estética', 'Holiday', 'ETC'];
        } else {
          selected = [];
        }
        state.selectedCalendars = selected;
      });
  },
});

export const { selectEvent } = appCalendarSlice.actions;

export default appCalendarSlice.reducer;
