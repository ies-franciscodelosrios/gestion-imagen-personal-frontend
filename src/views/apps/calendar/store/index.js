// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";

// ** Axios Imports
import axios from "axios";
import {
  AddAppointment,
  deleteAppointment,
  getAllAppointments,
  getAllClientsData,
  getAllStudentsData,
  getClientByData,
  getUserByDNI,
  updateAppointment,
} from "../../../../services/api";
import { findUser } from "./sort_utils";

export const fetchEvents = createAsyncThunk(
  "appCalendar/fetchEvents",
  async (calendars) => {
    const appointmentList = calendars.events;
    const studentList = calendars.users;
    const clientList = calendars.clients;
    const filtros = calendars.calendarLabel;
    if (calendars.events === null || calendars.events.length <= 0) {
      const students = await getAllStudentsData()
        .then((result) => result)
        .catch(() => console.log("error all student"));
      const clients = await getAllClientsData()
        .then((result) => result)
        .catch(() => console.log("error all client"));
      Object.assign(
        studentList,
        students.data.data.map((alumno) => ({
          value: `${alumno.name} ${alumno.surname}`,
          label: `${alumno.name} ${alumno.surname}`,
          id: alumno.id,
          avatar: "img5",
        }))
      );
      Object.assign(
        clientList,
        clients.data.data.map((cliente) => ({
          value: `${cliente.name} ${cliente.surname}`,
          label: `${cliente.name} ${cliente.surname}`,
          id: cliente.id,
          avatar: "img5",
        }))
      );
      const appointments = await getAllAppointments()
        .then((result) => {
          return result;
        })
        .catch(() => {
          console.log("error all apointments");
        });
      Object.assign(
        appointmentList,
        await appointments.data.data.map((event) => {
          const alumnoPromise = {
            ...students.data.data.find(
              (student) => student.id == event.id_student
            ),
          };
          const clientePromise = {
            ...clients.data.data.find((client) => client.id == event.id_client),
          };
          return {
            id: event.id,
            allDay: false,
            start: event.date,
            title: event.protocol,
            calendarLabel: event.treatment,
            created_at: event.created_at,
            color: event.treatment == 0 ? "#FFB6B9" : "#A6E4D9",
            editable: true,
            description: event.consultancy,
            extendedProps: {
              alumno: {
                value: `${alumnoPromise.name} ${alumnoPromise.surname}`,
                label: `${alumnoPromise.name} ${alumnoPromise.surname}`,
                id: alumnoPromise.id,
                avatar: "",
              },
              cliente: {
                value: `${clientePromise.name} ${clientePromise.surname}`,
                label: `${clientePromise.name} ${clientePromise.surname}`,
                id: clientePromise.id,
                avatar: "",
              },
            },
            backgroundColor: event.treatment == 0 ? "#FFB6B9" : "#A6E4D9",
          };
        })
      );
    }

    // Filtrar las citas según el valor de calendarLabel
    const filteredAppointments = appointmentList.filter((event) =>
      calendars.calendarLabel.includes(event.calendarLabel)
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
  "appCalendar/addEvent",
  async (event, { dispatch, getState }) => {
    const newEvent = await AddAppointment(event);
    const currentFilters = getState().calendar.calendarLabel;
    await dispatch(
      fetchEvents({
        events: [],
        users: [],
        clients: [],
        calendarLabel: currentFilters,
      })
    );
    return newEvent;
  }
);

export const updateEvent = createAsyncThunk(
  "appCalendar/updateEvent",
  async (event, { dispatch, getState }) => {
    await updateAppointment(event);
    const currentFilters = getState().calendar.calendarLabel;
    await dispatch(
      fetchEvents({
        events: [],
        users: [],
        clients: [],
        calendarLabel: currentFilters,
      })
    );
    return event;
  }
);

export const updateFilter = createAsyncThunk(
  "appCalendar/updateFilter",
  async (filter, { dispatch, getState }) => {
    const state = getState();
    const selectedCalendars = state.calendar.selectedCalendars;

    let updatedSelectedCalendars;

    if (selectedCalendars.includes(filter)) {
      updatedSelectedCalendars = selectedCalendars.filter((i) => i !== filter);
    } else {
      updatedSelectedCalendars = [...selectedCalendars, filter];
    }
    await dispatch(
      fetchEvents({
        events: [],
        users: [],
        clients: [],
        calendarLabel: updatedSelectedCalendars,
      })
    );
    return { updatedSelectedCalendars };
  }
);

export const updateAllFilters = createAsyncThunk(
  "appCalendar/updateAllFilters",
  async (value, { dispatch }) => {
    if (value === true) {
      await dispatch(
        fetchEvents({
          events: [],
          users: [],
          clients: [],
          calendarLabel: [0, 1],
        })
      );
    } else {
      await dispatch(
        fetchEvents({ events: [], users: [], clients: [], calendarLabel: [] })
      );
    }
    return value;
  }
);

export const removeEvent = createAsyncThunk(
  "appCalendar/removeEvent",
  async (id, { dispatch, getState }) => {
    await deleteAppointment(id);
    const currentFilters = getState().calendar.calendarLabel;
    await dispatch(
      fetchEvents({
        events: [],
        users: [],
        clients: [],
        calendarLabel: currentFilters,
      })
    );

    return id;
  }
);

export const appCalendarSlice = createSlice({
  name: "appCalendar",
  initialState: {
    users: [],
    clients: [],
    events: [],
    filteredEvents: [],
    selectedEvent: {},
    selectedCalendars: [0, 1],
    calendarLabel: [0, 1],
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
        const updatedEventIndex = state.events.findIndex(
          (event) => event.id === action.payload.id
        );
        if (updatedEventIndex !== -1) {
          state.events[updatedEventIndex] = action.payload;
        }
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        const removeEventIndex = state.events.findIndex(
          (event) => event.id === action.payload
        );
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
