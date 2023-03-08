import { useEffect, useRef, memo, useState } from 'react'

import '@fullcalendar/react/dist/vdom'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import locale from '@fullcalendar/core/locales/es'
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import toast from 'react-hot-toast'
import { Menu } from 'react-feather'
import { Card, CardBody } from 'reactstrap'
import { getAllAppointments, getAllClientsData, getClientByData, getUserByDNI } from '../../../services/api'
import { fetchEvents } from './store'

const Calendar = props => {

  const calendarRef = useRef(null)

  const {
    store,
    isRtl,
    dispatch,
    calendarsColor,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    blankEvent,
    toggleSidebar,
    selectEvent,
    updateEvent
  } = props

  const eventos = [];
  const alumnos = [];
  const clientes = [];
  // const [appointmentsLoaded, setAppointmentsLoaded] = useState(false)
  // const [appointments, setAppointments] = useState([])

  // const fetchAppointmentData = async () => {
  //   const response = await getAllAppointments();
  //   const appointments = response.data.users.map((event) => {
  //     const alumnoPromise = getUserByDNI(event.DNI_Student).then((response) => response.data.users);
  //     const clientePromise = getClientByData(event.DNI_client).then((response) => response.data.users);

  //     return {
  //       id: event.id,
  //       start: event.Date,
  //       title: event.Protocol,
  //       calendarLabel: event.Treatment,
  //       created_at: event.created_at,
  //       allDay: true,
  //       color: '#FAE3D9',
  //       editable: true,
  //       description: event.Consultancy,
  //       alumno: alumnoPromise.then((alumno) => ({
  //         value: `${alumno.Name} ${alumno.Surname}`,
  //         label: `${alumno.Name} ${alumno.Surname}`,
  //         dni: alumno.DNI,
  //         avatar: ''
  //       })),
  //       cliente: clientePromise.then((cliente) => ({
  //         value: `${cliente.Name} ${cliente.Surname}`,
  //         label: `${cliente.Name} ${cliente.Surname}`,
  //         dni: cliente.DNI,
  //         avatar: ''
  //       })),
  //       backgroundColor: '#FAE3D9'
  //     };
  //   });
  //   console.log(appointments);
  //   setAppointments(appointments);
  //   setAppointmentsLoaded(true);
  // };

  

  useEffect(() => {
    // if (!appointmentsLoaded) {
    //   fetchAppointmentData();
    // } else if (calendarApi === null) {
    //   setCalendarApi(calendarRef.current.getApi())}
    dispatch(fetchEvents({events:eventos,users:alumnos,clients:clientes}));
  }, [])
  // ** calendarOptions(Props)
  const calendarOptions = {
    events: store.events,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    timeZone: 'UTC',
    locales: locale,
    locale: 'es',
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: true,

    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,

    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]

      return [
        // Background Color
        `bg-light-${colorName}`
      ]
    },

    eventClick({ event: clickedEvent }) {
      dispatch(selectEvent(clickedEvent))
      handleAddEventSidebar()

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className='d-xl-none d-block' />,
        click() {
          toggleSidebar(true)
        }
      }
    },

    dateClick(info) {
      const ev = blankEvent
      ev.start = info.date
      ev.end = info.date
      dispatch(selectEvent(ev))
      handleAddEventSidebar()
    },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      dispatch(updateEvent(droppedEvent))
      toast.success('Cita Actualizada')
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      dispatch(updateEvent(resizedEvent))
      toast.success('Cita Actualizada')
    },

    ref: calendarRef,

    // Get direction from app state (store)
    direction: isRtl ? 'rtl' : 'ltr'
  }
  return (
    <Card className='shadow-none border-0 mb-0 rounded-0'>
      <CardBody className='pb-0'>
        <FullCalendar {...calendarOptions} />{' '}
        
      </CardBody>
    </Card>
  )
}

export default memo(Calendar)
