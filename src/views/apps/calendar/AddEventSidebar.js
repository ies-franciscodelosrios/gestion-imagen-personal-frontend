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

import { addEvent, fetchEvents } from '../calendar/store';

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
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState('');
  const [endPicker, setEndPicker] = useState(new Date());
  const [startPicker, setStartPicker] = useState(new Date());
  const [calendarLabel, setCalendarLabel] = useState([
    { value: 'Peluquería', label: 'Peluquería', color: 'primary' },
  ]);

  const fetchData = async () => {
    setAlumnos(store.users);
    setClientes(store.clients);
  };

  useEffect(() => {
    fetchData();
    handleSubmit();
    if (!isObjEmpty(selectedEvent)) {
      console.log(store.selectedEvent);
      selectedEvent.extendedProps.alumno.then((data) => {
        setUser(data.label || user);
      });

      selectedEvent.extendedProps.cliente.then((data) => {
        setClient(data.label || client);
      });
    }
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
    const obj = {
      title: getValues('title'),
      dateappo: startPicker.toISOString().split('T')[0],
      start: startPicker,
      dnialumno: dnialumno,
      dnicliente: dnicliente,
      display: 'block',
      extendedProps: {
        calendar: calendarLabel[0].label,
        url: url.length ? url : undefined,
        guests: guests.length ? guests : undefined,
        pupils: pupils.length ? pupils : undefined,
        // location: location.length ? location : undefined,
        desc: desc.length ? desc : undefined,
      },
    };

    console.log(obj);
    if ((obj.calendar = 'Peluquería')) obj.calendar = 0;
    else obj.calendar = 1;

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
    setAllDay(false);
    setUrl('');
    setLocation('');
    setDesc('');
    setGuests({});
    setPupils({});
    setCalendarLabel([
      { value: 'Peluquería', label: 'Peluquería', color: 'danger' },
    ]);
    setStartPicker(new Date());
    setEndPicker(new Date());
  };

  // ** Set sidebar fields
  const handleSelectedEvent = () => {
    if (!isObjEmpty(selectedEvent)) {
      const extendedProps = selectedEvent.extendedProps;
      const calendar = extendedProps && extendedProps.calendar;
      console.log(selectedEvent);
      // const resolveLabel = () => {

      //   // if (calendar.length) {
      //   //   console.log("hola");
      //   //   return { label: calendar, value: calendar, color: calendarsColor[calendar] }
      //   // } else {
      //   //   console.log("adios");
      //   //   return { value: 'Peluquería', label: 'Peluquería', color: 'danger' }
      //   // }
      // }

      console.log(store);
      selectedEvent.extendedProps.alumno.then((data) => {
        setUser(data.label || user);
      });

      selectedEvent.extendedProps.cliente.then((data) => {
        setClient(data.label || client);
      });

      setValue('title', selectedEvent.title || getValues('title'));
      if (
        selectedEvent.extendedProps.calendarLabel == '0' ||
        selectedEvent.extendedProps.calendarLabel == null
      ) {
        setCalendarLabel([{ value: 'Peluquería', label: 'Peluquería' }]);
      } else {
        console.log('hola');
        setCalendarLabel([{ value: 'Estética', label: 'Estética' }]);
      }
      console.log(selectedEvent.extendedProps.calendarLabel);
      // setAllDay(selectedEvent.allDay || allDay)
      // setUrl(selectedEvent.url || url)
      // setLocation(selectedEvent.extendedProps.location || location)
      setDesc(selectedEvent.extendedProps.description || desc);
      // setGuests(selectedEvent.extendedProps.guests || guests)
      // setPupils(obtenerAlumno() || 'hola')
      // selectedEvent.extendedProps.alumno.then(data => {

      // //   setPupils(data);
      //   setUser(data.label);
      // //   console.log(pupils);
      // //   console.log(alumnos);
      // //   console.log(data);
      // //   fetchData();

      // });

      setStartPicker(new Date(selectedEvent.extendedProps.created_at));
      console.log(selectedEvent.start);
      // setEndPicker(selectedEvent.allDay ? new Date(selectedEvent.start) : new Date(selectedEvent.end))
      // setCalendarLabel([resolveLabel()])
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
      const eventToUpdate = {
        id: selectedEvent.id,
        title: getValues('title'),
        dateappo: startPicker.toISOString().slice(0, 10),
        start: startPicker.toISOString(),
        dnialumno: dnialumno,
        dnicliente: dnicliente,
        display: 'block',
        extendedProps: {
          calendar: calendarLabel[0].label,
          url: url.length ? url : undefined,
          guests: guests.length ? guests : undefined,
          pupils: pupils.length ? pupils : undefined,
          // location: location.length ? location : undefined,
          desc: desc.length ? desc : undefined,
        },
      };

      const propsToUpdate = ['id', 'title', 'url', 'alumnos', 'desc'];
      const extendedPropsToUpdate = [
        'calendar',
        'guests',
        'alumnos',
        'pupils',
        'location',
        'description',
      ];
      dispatch(updateEvent(eventToUpdate));
      updateEventInCalendar(
        eventToUpdate,
        propsToUpdate,
        extendedPropsToUpdate
      );
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
    removeEventInCalendar(selectedEvent.id);
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
                  enableTime: true,
                  time_24hr: true,
                  dateFormat: 'Y-m-dTH:i:S',
                  timeZone: 'UTC+1',
                }}
              />
            </div>

            {isObjEmpty(selectedEvent) ? null : (
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="Cosmeticos">
                  Cliente:
                </Label>
                <Controller
                  control={control}
                  id="Cosmeticos"
                  name="Cosmeticos"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Cliente cita"
                      value={client}
                    />
                  )}
                />{' '}
              </Col>
            )}
            {isObjEmpty(selectedEvent) ? null : (
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="Cosmeticos">
                  Alumno:
                </Label>
                <Controller
                  control={control}
                  id="Cosmeticos"
                  name="Cosmeticos"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Cliente cita"
                      value={user}
                    />
                  )}
                />{' '}
              </Col>
            )}

            {selectedEvent &&
            selectedEvent.title &&
            selectedEvent.title.length ? null : (
              <div className="mb-1">
                <Label className="form-label" for="guests">
                  Asignar Cliente
                </Label>

                <Select
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  isMulti
                  id="guests"
                  className="react-select"
                  classNamePrefix="select"
                  isClearable={false}
                  options={clientes}
                  placeholder="Seleccionar"
                  theme={selectThemeColors}
                  value={guests.length ? [...guests] : null}
                  onChange={(data) => {
                    setGuests([...data]);
                    if (data) {
                      const selectedDnis = data.map((item) => item.dni);
                      setDniCliente(selectedDnis[0]);
                      console.log(dnicliente);
                    }
                  }}
                  components={{
                    Option: GuestsComponent,
                  }}
                />
              </div>
            )}
            {selectedEvent &&
            selectedEvent.title &&
            selectedEvent.title.length ? null : (
              <div className="mb-1">
                <Label className="form-label" for="pupils">
                  Elegir Alumno
                </Label>
                <Select
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  isMulti
                  id="pupils"
                  className="react-select"
                  classNamePrefix="select"
                  placeholder="Seleccionar"
                  isClearable={false}
                  options={alumnos}
                  theme={selectThemeColors}
                  value={pupils.length ? [...pupils] : null}
                  onChange={(data) => {
                    setPupils([...data]);
                    if (data) {
                      const selectedDnis = data.map((item) => item.dni);
                      setDniAlumno(selectedDnis[0]);
                      console.log(dnialumno);
                    }
                  }}
                  components={{
                    Option: GuestsComponent,
                  }}
                />
              </div>
            )}

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
