// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import { X } from 'react-feather';
import toast from 'react-hot-toast';
import Flatpickr from 'react-flatpickr';
import Select, { components } from 'react-select'; // eslint-disable-line
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useForm, Controller } from 'react-hook-form';

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
  Col,
} from 'reactstrap';

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils';


// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

import { addEvent, fetchEvents, updateFilter } from '../calendar/store';

const AddEventSidebar = (props) => {
  // ** Props
  const {
    open,
    store,
    dispatch,
    calendarApi,
    selectEvent,
    updateEvent,
    removeEvent,
    refetchEvents,
    handleAddEventSidebar,
  } = props;

  // ** Vars & Hooks
  const selectedEvent = store.selectedEvent,
    {
      control,
      setError,
      setValue,
      getValues,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: { title: '', description: '' },
    });

  // ** States
  const [alumnos, setAlumnos] = useState('');
  const [dnialumno, setDniAlumno] = useState('');
  const [dnicliente, setDniCliente] = useState('');
  const [clientes, setClientes] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');
  const [user, setUser] = useState('');
  const [client, setClient] = useState('');
  const [guests, setGuests] = useState({});
  const [pupils, setPupils] = useState({});
  const [errorDate, setErrorDate] = useState(""); // Variable de estado para el mensaje de error
  const now = new Date();

const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes();

const [startPicker, setStartPicker]   = useState(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
const [startTime, setStartTime] = useState(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
const [endTime, setEndTime]   = useState(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);


  const [calendarLabel, setCalendarLabel] = useState([
    { value: 'Peluquería', label: 'Peluquería', color: 'primary' },
  ]);

  const fetchData = async () => {
    setAlumnos(store.users);
    setClientes(store.clients);
  };
  
  const handleStartTimeChange = (date) => {
    const selectedTime = new Date(date[0]);
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setStartTime(formattedTime);
  
    // Verificar si la hora de fin es menor que la hora de inicio
    if (endTime < formattedTime) {
      setEndTime(""); // Reiniciar la hora de fin si es incorrecta
      setErrorDate("La hora de fin no puede estar antes de la hora de inicio");
    }
  };
  
  const handleEndTimeChange = (date) => {
    const selectedTime = new Date(date[0]);
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setEndTime(formattedTime);
  
    // Verificar si la hora de fin es menor que la hora de inicio
    if (formattedTime < startTime) {
      setStartTime(""); // Reiniciar la hora de fin si es incorrecta
      setErrorDate("La hora de inicio no puede estar después de la hora de fin");
    }
  };

  useEffect(() => {
    fetchData();
    handleSubmit();
  }, [store, handleSubmit, selectedEvent, client, user]);

  // ** Select Options
  const options = [
    { value: 'Peluquería', label: 'Peluquería', color: 'danger' },
    { value: 'Estética', label: 'Estética', color: 'warning' },
  ];

  // ** Custom select components
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span className={`bullet bullet-${data.color} bullet-sm me-50`}></span>
        {data.label}
      </components.Option>
    );
  };

  const GuestsComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex flex-wrap align-items-center">
          <div>{data.label}</div>
        </div>
      </components.Option>
    );
  };

  // ** Adds New Event
  const handleAddEvent = () => {
    const startDate = new Date(startPicker);
    const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
    const obj = {
      title: getValues('title'),
      start: formattedStartDate,
      start_time: startTime,
      end_time: endTime,
      dnialumno: dnialumno,
      dnicliente: dnicliente,
      display: 'block',
      desc: desc.length ? desc : undefined,
      calendar: calendarLabel[0].label,
      extendedProps: {
        url: url.length ? url : undefined,
        guests: guests.length ? guests : undefined,
        pupils: pupils.length ? pupils : undefined,
        // location: location.length ? location : undefined,
      },
    };




    if ((obj.calendar == 'Peluquería')) {obj.calendar = 0;}
    else {obj.calendar = 1;}
    dispatch(addEvent(obj));
    refetchEvents();
    fetchData();
    handleAddEventSidebar();
    toast.success('Cita Añadida');
  };

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    dispatch(selectEvent({}));
    setValue('title', '');
    setUrl('');
    setDesc('');
    setGuests({});
    setPupils({});
    setCalendarLabel([
      { value: 'Peluquería', label: 'Peluquería', color: 'danger' },
    ]);
    setStartPicker(new Date());
    // Reiniciar el estado de startTime
    const initialStartTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setStartTime(initialStartTime);
    setEndTime(initialStartTime);
  };

  // ** Set sidebar fields
  const handleSelectedEvent = () => {
    if (!isObjEmpty(selectedEvent)) {
      setStartPicker(selectedEvent.start);
      setStartTime(selectedEvent.extendedProps.start_time);
      setEndTime(selectedEvent.extendedProps.end_time);
      if (selectedEvent.title==='') {

        return { label: 'Peluquería', value: 'Peluquería', color: 'danger' }
      }
      
      setGuests(selectedEvent.extendedProps.cliente.label == "undefined undefined" ? "" : {
      value: selectedEvent.extendedProps.cliente.value,
      label: selectedEvent.extendedProps.cliente.label,
      dni: selectedEvent.extendedProps.cliente.dni,
      avatar: '',})
      setPupils(selectedEvent.extendedProps.alumno.label == "undefined undefined" ? "" : {
      value: selectedEvent.extendedProps.alumno.value,
      label: selectedEvent.extendedProps.alumno.label,
      dni: selectedEvent.extendedProps.alumno.dni,
      avatar: '',})
      setValue('title', selectedEvent.title || getValues('title'));

      if (
        selectedEvent.extendedProps.calendarLabel == 0 ||
        selectedEvent.extendedProps.calendarLabel == null
      ) {
        setCalendarLabel([{ value: 'Peluquería', label: 'Peluquería', color: '#FFB6B9' }]);
      } else {

        setCalendarLabel([{ value: 'Estética', label: 'Estética', color: '#A6E4D9' }]);
      }
      setDesc(selectedEvent.extendedProps.description || desc);
    }
  };        

  // ** (UI) updateEventInCalendar
  const updateEventInCalendar = (
    updatedEventData,
    propsToUpdate,
    extendedPropsToUpdate
  ) => {
    const existingEvent = calendarApi.getEventById(updatedEventData.id);

    // ** Set event properties except date related
    // ? Docs: https://fullcalendar.io/docs/Event-setProp
    // ** dateRelatedProps => ['start', 'end', 'allDay']
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index];
      existingEvent.setProp(propName, updatedEventData[propName]);
    }

    // ** Set date related props
    // ? Docs: https://fullcalendar.io/docs/Event-setDates
    existingEvent.setDates(
      new Date(updatedEventData.start),
      new Date(updatedEventData.end),
      {
        allDay: updatedEventData.allDay,
      }
    );

    // ** Set event's extendedProps
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index];
      existingEvent.setExtendedProp(
        propName,
        updatedEventData.extendedProps[propName]
      );
    }
  };

  // ** Updates Event in Store
  const handleUpdateEvent = () => {
    if (getValues('title').length) {
      const startDate = new Date(startPicker);
      const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
      const eventToUpdate = {
        id: selectedEvent.id,
        title: getValues('title'),
        start: formattedStartDate,
        start_time: startTime,
        end_time: endTime,
        dnialumno: pupils[0]?.dni || selectedEvent.extendedProps.alumno.dni || undefined,
        dnicliente: guests[0]?.dni || selectedEvent.extendedProps.cliente.dni || undefined,
        display: 'block',
        desc: desc.length ? desc : undefined,
        calendar: calendarLabel[0].label,
      };

      if ((eventToUpdate.calendar == 'Peluquería')) {eventToUpdate.calendar = 0;}
      else {eventToUpdate.calendar = 1;}

      const propsToUpdate = ['id', 'title', 'url', 'alumnos', 'desc'];
      const extendedPropsToUpdate = [
        'calendar',
        'guests',
        'alumnos',
        'pupils',
        'location',
        'description',
      ];
     dispatch(updateEvent(eventToUpdate))
      // updateEventInCalendar(
      //   eventToUpdate,
      //   propsToUpdate,
      //   extendedPropsToUpdate
      // );
      handleAddEventSidebar();
      toast.success('Cita Actualizada');
    } else {
      setError('title', {
        type: 'manual',
      });
    }
  };

  // ** (UI) removeEventInCalendar
  const removeEventInCalendar = (eventId) => {
    calendarApi.getEventById(eventId).remove();
  };

  const handleDeleteEvent = () => {
    dispatch(removeEvent(selectedEvent.id));
    // removeEventInCalendar(selectedEvent.id);
    handleAddEventSidebar();
    toast.error('Cita Eliminada');
  };

  // ** Event Action buttons
  const EventActions = () => {
    if (
      isObjEmpty(selectedEvent) ||
      (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)
    ) {
      return (
        <Fragment>
          <Button className="me-1" type="submit" color="primary">
            Añadir
          </Button>
          <Button
            color="secondary"
            type="reset"
            onClick={handleAddEventSidebar}
            outline
          >
            Cancelar
          </Button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Button className="me-1" color="primary" onClick={handleUpdateEvent}>
            Actualizar
          </Button>
          <Button color="danger" onClick={handleDeleteEvent} outline>
            Eliminar
          </Button>
        </Fragment>
      );
    }
  };

  // ** Close BTN
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleAddEventSidebar} />
  );


  return (
    <Modal
      isOpen={open}
      className="sidebar-lg"
      toggle={handleAddEventSidebar}
      onOpened={() => handleSelectedEvent(selectedEvent)}
      onClosed={handleResetInputValues}
      contentClassName="p-0 overflow-hidden"
      modalClassName="modal-slide-in event-sidebar"
    >
      <ModalHeader
        className="mb-1"
        toggle={handleAddEventSidebar}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">
          {selectedEvent && selectedEvent.title && selectedEvent.title.length
            ? 'Actualizar'
            : 'Añadir'}{' '}
          Cita
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          <Form
            onSubmit={handleSubmit((data) => {
              if (data.title.length) {
                if (isObjEmpty(errors)) {
                  if (
                    isObjEmpty(selectedEvent) ||
                    (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)
                  ) {
                    handleAddEvent();
                  } else {
                    handleUpdateEvent();
                  }
                  handleAddEventSidebar();
                }
              } else {
                setError('title', {
                  type: 'manual',
                });
              }
            })}
          >
            <div className="mb-1">
              <Label className="form-label" for="title">
                Nombre del Tratamiento <span className="text-danger">*</span>
              </Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    id="title"
                    placeholder="Tratamiento"
                    invalid={errors.title && true}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="mb-1">
              <Label className="form-label" for="label">
                Tipo de Tratamiento
              </Label>
              <Select
                id="label"
                value={calendarLabel}
                options={options}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                isClearable={false}
                onChange={(data) => setCalendarLabel([data])}
                components={{
                  Option: OptionComponent,
                }}
              />
            </div>

              <div className="mb-1">
                <Label className="form-label" for="startDate">
                  Fecha de Inicio
                </Label>
                <Flatpickr
                  required
                  id="startDate"
                  name="startDate"
                  className="form-control"
                  onChange={(date) => setStartPicker(date[0])}
                  value={startPicker}
                  options={{
                    enableTime: false,
                    time_24hr: true,
                    dateFormat: 'd-m-Y',
                    timeZone: 'UTC+1',
                  }}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="startDate">
                  Hora de Inicio
                </Label>
                <Flatpickr
                  required
                  id="startTime"
                  name="startTime"
                  className="form-control"
                  onChange={handleStartTimeChange}
                  value={startTime}
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    time_24hr: true,
                    timeZone: 'UTC+1',
                  }}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="startDate">
                  Hora de Fin
                </Label>
                <Flatpickr
                  required
                  id="endTime"
                  name="endTime"
                  className="form-control"
                  onChange={handleEndTimeChange}
                  value={endTime}
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    time_24hr: true,
                    timeZone: 'UTC+1',
                  }}
                />
              </div>
              {errorDate && <div className="error-message" style={{ color: 'red', fontSize: '13px', marginBottom: '10px' }}>{errorDate}</div>} {/* Mostrar el mensaje de error si existe */}
              <div className="mb-1">
                <Label className="form-label" for="guests">
                  Asignar Cliente
                </Label>

                <Select
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  id="guests"
                  className="react-select"
                  classNamePrefix="select"
                  isClearable={false}
                  options={clientes}
                  placeholder="Seleccionar"
                  theme={selectThemeColors}
                  value={guests}
                  onChange={(data) => {
                    setGuests([data]);
                    if (data) {
                      const selectedDnis = data.dni;
                      setDniCliente(selectedDnis);
                    }
                  }}
                  components={{
                    Option: GuestsComponent,
                  }}

                />
              </div>
            

              <div className="mb-1">
                <Label className="form-label" for="pupils">
                  Elegir Alumno
                </Label>
                <Select
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  id="pupils"
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Seleccionar"
                  isClearable={false}
                  options={alumnos}
                  theme={selectThemeColors}
                  value={pupils}
                  onChange={(data) => {
                    setPupils([data]);
                    if (data) {
                      const selectedDnis = data.dni;
                      setDniAlumno(selectedDnis);
                    }
                  }}
                  components={{
                    Option: GuestsComponent,
                  }}
                />
              </div>
            

            <div className="mb-1">
              <Label className="form-label" for="description">
                Descripción
              </Label>
              <Input
                type="textarea"
                name="text"
                id="description"
                rows="3"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Descripción"
              />
            </div>
            <div className="d-flex mb-1">
              <EventActions />
            </div>
          </Form>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  );
};

export default AddEventSidebar;