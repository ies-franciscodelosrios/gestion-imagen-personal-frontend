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
    const studentList = calendars.users;
    const clientList = calendars.clients;
    const filtros = calendars.calendarLabel;
    if (calendars.events === null || calendars.events.length <= 0 || calendars.events.calendarLabel==filtros) {
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
    return {
      events: appointmentList,
      users: studentList,
      clients: clientList
    };
  }
);

export const addEvent = createAsyncThunk(
  'appCalendar/addEvent',
  async (event, { dispatch, getState }) => {
    await AddAppointment(event);
    await dispatch( fetchEvents({events: [], users: [], clients: []}));
    return event;
  }
);

export const updateEvent = createAsyncThunk(
  'appCalendar/updateEvent',
  async (event, { dispatch, getState }) => {
    console.log(event);
    await updateAppointment(event);
    await dispatch(fetchEvents({events: [], users: [], clients: []}));
    return event;
  }
);

// export const updateFilter = createAsyncThunk(
//   'appCalendar/updateFilter',

//   async (filter, { dispatch, getState }) => {
//     if (getState().calendar.selectedCalendars.includes(filter)) {

//       await dispatch(
//         fetchEvents(
//           getState().calendar.selectedCalendars.filter((i) => i !== filter)
//         )
//       );
//     } else {

//       await dispatch(
//         fetchEvents([...getState().calendar.selectedCalendars, filter])
//       );
//     }
//     return filter;
//   }
// );



export const updateFilter = createAsyncThunk(
  'appCalendar/updateFilter',
  async (filter, { dispatch, getState }) => {
    const state = getState();
    const selectedCalendars = state.calendar.selectedCalendars;
    console.log(state.calendar.selectedCalendars);
        if (selectedCalendars.includes(filter)) {
          console.log("ESTOY DENTRO");

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
        fetchEvents(['Peluquer??a', 'Est??tica'])
      );
    } else {
      await dispatch(fetchEvents([]));
    }
    return value;
  }
);

export const removeEvent = createAsyncThunk(
  'appCalendar/removeEvent',
  async (id, { dispatch, getState }) => {
    await deleteAppointment(id);
    await dispatch(fetchEvents({events: [], users: [], clients: []}));
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
    selectedCalendars: ['Peluquer??a', 'Est??tica'],
    calendarLabel:['Peluquer??a', 'Est??tica']
  },
  reducers: {
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload.events;
        state.users = action.payload.users;
        state.clients = action.payload.clients;
        state.calendarLabel = action.payload.calendarLabel;
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
          selected = ['Peluquer??a', 'Est??tica'];
        } else {
          selected = [];
        }
        state.selectedCalendars = selected;
      });
  },
});

export const { selectEvent } = appCalendarSlice.actions;

export default appCalendarSlice.reducer;
