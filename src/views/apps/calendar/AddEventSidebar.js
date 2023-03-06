// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { X } from 'react-feather'
import toast from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'
import Select, { components } from 'react-select' // eslint-disable-line
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, Label, Input, Form } from 'reactstrap'

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'

// ** Avatar Images
import img1 from '@src/assets/images/avatars/1-small.png'
import img2 from '@src/assets/images/avatars/3-small.png'
import img3 from '@src/assets/images/avatars/5-small.png'
import img4 from '@src/assets/images/avatars/7-small.png'
import img5 from '@src/assets/images/avatars/9-small.png'
import img6 from '@src/assets/images/avatars/11-small.png'

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { AddAppointment, getAllAppointments, getAllClientsData, getAllStudentsData, getAllUserData } from '../../../services/api'
import {fetchEvents} from '../calendar/store'




const AddEventSidebar = props => {
  // ** Props
  const {
    open,
    store,
    dispatch,
    addEvent,
    calendarApi,
    selectEvent,
    updateEvent,
    removeEvent,
    refetchEvents,
    calendarsColor,
    handleAddEventSidebar
  } = props

  // ** Vars & Hooks
  const selectedEvent = store.selectedEvent,
    {
      control,
      setError,
      setValue,
      getValues,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues: { title: '' }
    })

  // ** States
  const [alumnos, setAlumnos] = useState('')
  const [dnialumno, setDniAlumno] = useState('')
  const [dnicliente, setDniCliente] = useState('')
  const [clientes, setClientes] = useState('')
  const [url, setUrl] = useState('')
  const [desc, setDesc] = useState('')
  const [guests, setGuests] = useState({})
  const [pupils, setPupils] = useState({})
  const [allDay, setAllDay] = useState(false)
  const [location, setLocation] = useState('')
  const [endPicker, setEndPicker] = useState(new Date())
  const [startPicker, setStartPicker] = useState(new Date())
  const [calendarLabel, setCalendarLabel] = useState([{ value: 'Peluquería', label: 'Peluquería', color: 'danger' }])
  useEffect(() => {
    fetchData();
    handleSubmit();
    dispatch(fetchEvents({
    }))
  }, [fetchEvents]);

  
  // ** Select Options
  const options = [
    { value: 'Peluquería', label: 'Peluquería', color: 'danger' },
    { value: 'Estética', label: 'Estética', color: 'warning' },
  ]

  const fetchData = async () => {
    const response = await getAllStudentsData();
    const response2 = await getAllClientsData();
    const data = response.data.users.map((alumno) => ({
      value: `${alumno.Name} ${alumno.Surname}`,
      label: `${alumno.Name} ${alumno.Surname}`,
      dni: alumno.DNI,
      avatar: img5
    }));
    const data2 = response2.data.users.map((cliente) => ({
      value: `${cliente.Name} ${cliente.Surname}`,
      label: `${cliente.Name} ${cliente.Surname}`,
      dni: cliente.DNI,
      avatar: img5
    }));
    setAlumnos(data);
    setClientes(data2);
  };



  // ** Custom select components
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span className={`bullet bullet-${data.color} bullet-sm me-50`}></span>
        {data.label}
      </components.Option>
    )
  }

  const GuestsComponent = ({ data, ...props }) => {
    return (          
      <components.Option {...props}>
        <div className='d-flex flex-wrap align-items-center'>
          <div>{data.label}</div>
        </div>
      </components.Option>
    )
  }

  // ** Adds New Event
  const handleAddEvent = () => {
    const obj = {
      title: getValues('title'),
      dateappo: startPicker.toISOString().slice(0, 10),
      start: startPicker,
      dnialumno : dnialumno,
      dnicliente : dnicliente,
      display: 'block',
      extendedProps: {
        calendar: calendarLabel[0].label,
        url: url.length ? url : undefined,
        guests: guests.length ? guests : undefined,
        pupils: pupils.length ? pupils : undefined,
        // location: location.length ? location : undefined,
        desc: desc.length ? desc : undefined
      }
    }

    console.log(obj.dateappo);
    if(obj.calendar="Peluquería")
      obj.calendar= 0;
    else
      obj.calendar=1;

    console.log(obj.calendar);
    AddAppointment(obj);
    // dispatch(addEvent(obj))
    refetchEvents()

    handleAddEventSidebar()
    toast.success('Cita Añadida')
  }

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    dispatch(selectEvent({}))
    setValue('title', '')
    setAllDay(false)
    setUrl('')
    setLocation('')
    setDesc('')
    setGuests({})
    setPupils({})
    setCalendarLabel([{ value: 'Peluquería', label: 'Peluquería', color: 'danger' }])
    setStartPicker(new Date())
    setEndPicker(new Date())
  }

  // ** Set sidebar fields
  const handleSelectedEvent = () => {
    if (!isObjEmpty(selectedEvent)) {
      const extendedProps = selectedEvent.extendedProps;
      const calendar = extendedProps && extendedProps.calendar;
      console.log(calendar);
      const resolveLabel = () => {

        if (calendar.length) {
          console.log("hola");
          return { label: calendar, value: calendar, color: calendarsColor[calendar] }
        } else {
          console.log("adios");
          return { value: 'Peluquería', label: 'Peluquería', color: 'danger' }
        }
      }
      setValue('title', selectedEvent.title || getValues('title'))
      setAllDay(selectedEvent.allDay || allDay)
      setUrl(selectedEvent.url || url)
      setLocation(selectedEvent.extendedProps.location || location)
      setDesc(selectedEvent.extendedProps.description || desc)
      setGuests(selectedEvent.extendedProps.guests || guests)
      setPupils(selectedEvent.extendedProps.pupils || pupils)
      setStartPicker(new Date(selectedEvent.start))
      setEndPicker(selectedEvent.allDay ? new Date(selectedEvent.start) : new Date(selectedEvent.end))
      setCalendarLabel([resolveLabel()])
    }
  }

  // ** (UI) updateEventInCalendar
  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
    const existingEvent = calendarApi.getEventById(updatedEventData.id)

    // ** Set event properties except date related
    // ? Docs: https://fullcalendar.io/docs/Event-setProp
    // ** dateRelatedProps => ['start', 'end', 'allDay']
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index]
      existingEvent.setProp(propName, updatedEventData[propName])
    }

    // ** Set date related props
    // ? Docs: https://fullcalendar.io/docs/Event-setDates
    existingEvent.setDates(new Date(updatedEventData.start), new Date(updatedEventData.end), {
      allDay: updatedEventData.allDay
    })

    // ** Set event's extendedProps
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    // ** eslint-disable-next-line no-plusplus
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index]
      existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName])
    }
  }

  // ** Updates Event in Store
  const handleUpdateEvent = () => {
    if (getValues('title').length) {
      const eventToUpdate = {
          id: selectedEvent.id,
          title: getValues('title'),
          dateappo: startPicker.toISOString().slice(0, 10),
          start: startPicker.toISOString(),
          dnialumno : dnialumno,
          dnicliente : dnicliente,
          display: 'block',
          extendedProps: {
            calendar: calendarLabel[0].label,
            url: url.length ? url : undefined,
            guests: guests.length ? guests : undefined,
            pupils: pupils.length ? pupils : undefined,
            // location: location.length ? location : undefined,
            desc: desc.length ? desc : undefined
          }
        }

      const propsToUpdate = ['id', 'title', 'url', 'alumnos']
      const extendedPropsToUpdate = ['calendar', 'guests','alumnos','pupils', 'location', 'description']
      dispatch(updateEvent(eventToUpdate))
      updateEventInCalendar(eventToUpdate, propsToUpdate, extendedPropsToUpdate)
      handleAddEventSidebar()
      toast.success('Cita Actualizada')
    } else {
      setError('title', {
        type: 'manual'
      })
    }
  }
  const flatpickrOptions = {
    enableTime: true,
    time_24hr: true,
    dateFormat: 'Y-m-d H:i',
    mode: 'single', // Muestra un solo campo de fecha en dispositivos móviles
    // Otras opciones...
  };

  // ** (UI) removeEventInCalendar
  const removeEventInCalendar = eventId => {
    calendarApi.getEventById(eventId).remove()
  }

  const handleDeleteEvent = () => {
    dispatch(removeEvent(selectedEvent.id))
    removeEventInCalendar(selectedEvent.id)
    handleAddEventSidebar()
    toast.error('Cita Eliminada')
  }

  // ** Event Action buttons
  const EventActions = () => {
    if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)) {
      return (
        <Fragment>
          <Button className='me-1' type='submit' color='primary'>
            Añadir
          </Button>
          <Button color='secondary' type='reset' onClick={handleAddEventSidebar} outline>
            Cancelar
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button className='me-1' color='primary' onClick={handleUpdateEvent}>
            Actualizar
          </Button>
          <Button color='danger' onClick={handleDeleteEvent} outline>
            Eliminar
          </Button>
        </Fragment>
      )
    }
  }

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

  return (
    <Modal
      isOpen={open}
      className='sidebar-lg'
      toggle={handleAddEventSidebar}
      onOpened={ handleSelectedEvent(selectedEvent)}
      onClosed={handleResetInputValues}
      contentClassName='p-0 overflow-hidden'
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          {selectedEvent && selectedEvent.title && selectedEvent.title.length ? 'Actualizar' : 'Añadir'} Cita
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
          <Form
            onSubmit={handleSubmit(data => {
              if (data.title.length) {
                if (isObjEmpty(errors)) {
                  if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent.title.length)) {
                    handleAddEvent()
                  } else {
                    handleUpdateEvent()
                  }
                  handleAddEventSidebar()
                }
              } else {
                setError('title', {
                  type: 'manual'
                })
              }
            })}
          >
            <div className='mb-1'>
              <Label className='form-label' for='title'>
                Nombre del Tratamiento <span className='text-danger'>*</span>
              </Label>
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <Input id='title' placeholder='Tratamiento' invalid={errors.title && true} {...field} />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='label'>
                Tipo de Tratamiento
              </Label>
              <Select
                id='label'
                value={calendarLabel}
                options={options}
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
                onChange={data => setCalendarLabel([data])}
                components={{
                  Option: OptionComponent
                }}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='startDate'>
               Fecha de Inicio
              </Label>
              <Flatpickr
                required
                locale='es'
                id='startDate'
                name='startDate'
                className='form-control'
                onChange={date => setStartPicker(date[0])}
                value={startPicker}
                options={{
                  enableTime: true,
                  time_24hr: true,
                  dateFormat: 'd-m-Y H:i',
                  locale:"es",
                  timeZone: 'UTC+1'
                }}
              />
            </div>

            {/* <div className='mb-1'>
              <Label className='form-label' for='endDate'>
                Fecha de Terminar
              </Label>
              <Flatpickr
                required
                locale='es'
                id='endDate'
                // tag={Flatpickr}
                name='endDate'
                className='form-control'
                onChange={date => setEndPicker(date[0])}
                value={endPicker}
                options={{
                  enableTime: allDay === false,
                  dateFormat: 'd-m-Y H:i'
                }}
              />
            </div> */}
{/* 
            <div className='form-switch mb-1'>
              <Input
                id='allDay'
                type='switch'
                className='me-1'
                checked={allDay}
                name='customSwitch'
                onChange={e => setAllDay(e.target.checked)}
              />
              <Label className='form-label' for='allDay'>
                All Day
              </Label>
            </div>
              */}
              {/*
            <div className='mb-1'>
              <Label className='form-label' for='eventURL'>
                Event URL
              </Label>
              <Input
                type='url'
                id='eventURL'
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder='https://www.google.com'
              />
            </div>
 */}
            <div className='mb-1'>
              <Label className='form-label' for='guests'>
                Asignar Cliente
              </Label>
              <Select
menuPortalTarget={document.body} 
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                isMulti
                id='guests'
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
                options={clientes}
                placeholder='Seleccionar'
                theme={selectThemeColors}
                value={guests.length ? [...guests] : null}
                onChange={data => { setGuests([...data])
                  if (data) {
                    const selectedDnis = data.map(item => item.dni);
                    setDniCliente(selectedDnis[0]);
                    console.log(dnicliente);
                  }
                }}
                components={{
                  Option: GuestsComponent
                  
                }}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='pupils'>
                Elegir Alumno
              </Label>
              <Select
              menuPortalTarget={document.body} 
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}          
                isMulti
                id='pupils'
                className='react-select'
                classNamePrefix='select'
                placeholder='Seleccionar'
                isClearable={false}
                options={alumnos}
                theme={selectThemeColors}
                value={pupils.length ? [...pupils] : null}
                onChange={data => { setPupils([...data]);
                  if (data) {
                    const selectedDnis = data.map(item => item.dni);
                    setDniAlumno(selectedDnis[0]);
                    console.log(dnialumno);
                  }
                }}
                components={{
                  Option: GuestsComponent
                }}
              />
            </div>

            {/*
            <div className='mb-1'>
              <Label className='form-label' for='location'>
                Location
              </Label>
              <Input id='location' value={location} onChange={e => setLocation(e.target.value)} placeholder='Office' />
            </div>
 */}
            <div className='mb-1'>
              <Label className='form-label' for='description'>
                Descripción
              </Label>
              <Input
                type='textarea'
                name='text'
                id='description'
                rows='3'
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder='Descripción'
              />
            </div>
            <div className='d-flex mb-1'>
              <EventActions />
            </div>
          </Form>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  )
}

export default AddEventSidebar
