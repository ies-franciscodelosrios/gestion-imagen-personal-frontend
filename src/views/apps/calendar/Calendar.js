import { useEffect, useRef, memo, useState } from 'react';

import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import locale from '@fullcalendar/core/locales/es';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import toast from 'react-hot-toast';
import { Menu } from 'react-feather';
import { Card, CardBody } from 'reactstrap';
import {
  getAllAppointments,
  getAllClientsData,
  getClientByData,
  getUserByDNI,
} from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from './store';

const Calendar = (props) => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.calendar);

  //Variables
  const calendarRef = useRef(null);
  const [appointmentList, setappointmentList] = useState([]);
  const [userList, setuserList] = useState([]);
  const [clientList, setclientList] = useState([]);



  const {
    isRtl,
    calendarsColor,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    blankEvent,
    toggleSidebar,
    selectEvent,
    updateEvent,
  } = props;

  useEffect(() => {
    (appointmentList.length<=0) ? dispatch(fetchEvents({ events: appointmentList, users: [], clients: [], calendarLabel: [0, 1] })) : null;
    setappointmentList(store.events);
  }, [store.events]);

  // ** calendarOptions(Props)
  const calendarOptions = {
    events: appointmentList,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    timeZone: 'UTC+1',
    locales: locale,
    locale: 'es',
    initialView: 'dayGridMonth',
    eventOrder: 'start_time',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
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
      const colorName =
        calendarsColor[calendarEvent._def.extendedProps.calendar];

      return [
        // Background Color
        `bg-light-${colorName}`,
      ];
    },

    eventClick({ event: clickedEvent }) {
      dispatch(selectEvent(clickedEvent));
      handleAddEventSidebar();

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className="d-xl-none d-block" />,
        click() {
          toggleSidebar(true);
        },
      },
    },

    dateClick(info) {
      const ev = blankEvent;
      ev.start = info.date;
      ev.end = info.date;
      dispatch(selectEvent(ev));
      handleAddEventSidebar();
    },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      const startDate = new Date(droppedEvent.start);
      const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
      const obj = {
        id: droppedEvent.id,
        title: droppedEvent.title,
        start: formattedStartDate,
        start_time: droppedEvent.extendedProps.start_time,
        end_time: droppedEvent.extendedProps.end_time,
        dnialumno: droppedEvent.extendedProps.alumno.dni,
        dnicliente: droppedEvent.extendedProps.cliente.dni,
        desc: droppedEvent.extendedProps.description,
        calendar: droppedEvent.extendedProps.calendarLabel,
      };
      dispatch(updateEvent(obj));
      toast.success('Cita Actualizada');
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      dispatch(updateEvent(resizedEvent));
      toast.success('Cita Actualizada');
    },



    // Get direction from app state (store)
    direction: isRtl ? 'rtl' : 'ltr',
  };

  return (
    <Card className="shadow-none border-0 mb-0 rounded-0">
      <CardBody className="pb-0">
        <FullCalendar ref={calendarRef} {...calendarOptions} />{' '}
      </CardBody>
    </Card>
  );
};

export default memo(Calendar);