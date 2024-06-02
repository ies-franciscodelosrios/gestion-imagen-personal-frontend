// ** React Imports
import { useState, useEffect, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Button,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from 'reactstrap';

// ** Third Party Components
import { useForm } from 'react-hook-form';
import Select from 'react-select';


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import { toast } from 'react-hot-toast';
import { AppointmentTreatment } from '../../../../utility/Constants';

// ** Utils
import { selectThemeColors } from '@utils';
import { Swiper, SwiperSlide } from 'swiper/react';


// ** Styles
import '@styles/react/libs/swiper/swiper.scss'
// ** Third Party Components
import SwiperCore, {
  Grid,
  Lazy,
  Virtual,
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow
} from 'swiper'
import { deleteAppointmentCloudinary, getAppointmentCloudinary, updateAppointment, updateAppointment2, getAllStudentsData, getAllClientsData, apiGetUserById, getClientById } from '../../../../services/api';
import ImageUploader from '../../../../services/CloudiaryUploader';
import { handleConfirmCancel } from '../../../../utility/Utils';
// ** Init Swiper Functions
SwiperCore.use([Navigation, Grid, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const params = {
  effect: 'coverflow',
  slidesPerView: 'auto',
  centeredSlides: true,
  pagination: {
    clickable: true
  },
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  }
}

const AppointmentCard = ({ entity, shows, onClose }) => {
  const [show, setShow] = useState(shows);
  const [selectEntity, setSelectEntity] = useState(entity);
  const [updatedEntity, setUpdatedEntity] = useState({ ...entity });
  const [photos, setPhotos] = useState([]);
  const [students, setStudents] = useState([]);
  const [clients, setClients] = useState([]);
  const [studentName, setStudentName] = useState('');
  const flatpickrRef = useRef(null);
  const [studentOption, setStudentOption] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientOption, setClientOption] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isStudentLoading, setIsStudentLoading] = useState(true); 
  const [isClientLoading, setIsClientLoading] = useState(true);   

  useEffect(() => {
    if (!dataLoaded) {
      fetchStudents();
    }
  }, [dataLoaded]);

  useEffect(() => {
    if (entity && entity.id_student) {
      fetchStudentName(entity.id_student);
    }
  }, [entity]);

  useEffect(() => {
    if (entity && entity.id_client) {
      fetchClientName(entity.id_client);
    }
  }, [entity]);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudentsData();
      const studentsData = response.data.data;
      const formattedStudents = studentsData.map(student => ({
        value: student.id,
        label: `${student.name} ${student.surname}`
      }));
      setStudents(formattedStudents);
      setDataLoaded(true); 
    } catch (error) {
      console.error('Error al obtener los estudiantes:', error);
    }
  };

  // Función para obtener el nombre del estudiante asociado con la cita
  const fetchStudentName = async (studentId) => {
    try {
      setIsStudentLoading(true); 
      const response = await apiGetUserById(studentId);
      const { name, surname } = response.data.data;
      setStudentName(`${name} ${surname}`);
      setStudentOption({ value: studentId, label: `${name} ${surname}` });
    } catch (error) {
      console.error('Error al obtener el nombre del estudiante:', error);
    } finally {
      setIsStudentLoading(false); 
    }
  };

  // Función para obtener la lista de clientes
  const fetchClients = async () => {
    try {
      const response = await getAllClientsData();
      const clientsData = response.data.data;
      const formattedClients = clientsData.map(client => ({
        value: client.id,
        label: `${client.name} ${client.surname}`
      }));
      setClients(formattedClients);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  // Función para obtener el nombre del cliente asociado con la cita
  const fetchClientName = async (clientId) => {
    try {
      setIsClientLoading(true); // Inicia la carga
      const response = await getClientById(clientId);
      const { name, surname } = response.data.data;
      setClientName(`${name} ${surname}`);
      setClientOption({ value: clientId, label: `${name} ${surname}` });
    } catch (error) {
      console.error('Error al obtener el nombre del cliente:', error);
    } finally {
      setIsClientLoading(false); 
    }
  };

  // Llamada a la función para obtener el nombre del estudiante asociado con la cita cuando el ID del estudiante cambia
  useEffect(() => {
    if (studentName) {
      setStudentOption({ value: entity.id_student, label: studentName });
    }
  }, [studentName]);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        flatpickrRef.current &&
        !flatpickrRef.current.contains(event.target) &&
        !event.target.classList.contains('flatpickr-day')
      ) {
        flatpickrRef.current._input.blur();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);




  useEffect(() => {
    setShow(shows);
    setSelectEntity(entity);
    reset({ ...entity });
    fetchPhotos();
    fetchClients();
  }, [shows, entity]);

  useEffect(() => {
    if (selectEntity?.id_student) {
      fetchStudentName(selectEntity.id_student);
    } else {
      setStudentName('Nombre no disponible'); 
    }
  }, [selectEntity.id_student]);



  // ** Get data on mount
  const fetchPhotos = async () => {
    try {
      getAppointmentCloudinary({
        "id": entity.id
      }).then(e => {
        setPhotos(e.data.images);
      }).catch(e => {
        console.log(e);
      })
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  };


  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      protocol: selectEntity?.protocol || '',
      surname: selectEntity?.surname || '',
      email: selectEntity?.email || '',
      date: selectEntity?.date || '',
      student: selectEntity?.student?.id || '', 
      client: selectEntity?.client?.id || '', 
    },
  });



  const onSubmit = async () => {
    if (true) {
      await updateAppointment2(updatedEntity).then(e => { toast.success('Datos guardados') }).catch(e => { toast.error('Error al guardar') });
      closeModal();
    } else {
      for (const key in updatedEntity) {
        if (updatedEntity[key]?.length <= 1) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  };

  const handleReset = () => {
    reset({ ...entity });
  };

  const closeModal = () => {
    setShow(false);
    onClose(false);
  }

  const appendSlide = () => {
    //addAppointmentCloudinary({id: selectEntity.id})
  }

  const removeSlide = async (item) => {
    // Obtener la última parte de la URL que representa el nombre del archivo
    const urlParts = item.url.split('/');
    const filenameWithExtension = urlParts[urlParts.length - 1];

    // Obtener el nombre del archivo sin la extensión
    const filename = filenameWithExtension.split('.')[0];

    await deleteAppointmentCloudinary({
      "id": item.imageable_id,
      "photo_id": item.id,
      "public_id": filename,
    }).then(e => {
      toast.success('Foto Eliminada');
    }).catch(e => {
      toast.error('Error al Eliminar Foto');
    })
    fetchPhotos();
  }

  useEffect(() => {
    // Buscar el estudiante correspondiente al ID de estudiante en el appointment
    const defaultStudent = students.find(student => student.value === entity?.id_student);

    // Mostrar console logs si el estudiante por defecto se encuentra
    if (defaultStudent) {
      console.log("ID del estudiante por defecto:", defaultStudent.value);
      console.log("Nombre del estudiante por defecto:", defaultStudent.label);
    }
  }, [entity, students]);





  return (
    <Modal
      isOpen={show || shows}
      toggle={() => closeModal()}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader
        className="bg-transparent"
        toggle={() => closeModal()}
      ></ModalHeader>
      <ModalBody className="px-sm-5 pt-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">Editar Cita</h1>
          <p>Actualizar los datos de la cita de manera segura.</p>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="gy-1 pt-75">
            <Col md={6} xs={12}>
              <Label className="form-label" for="protocol">
                Nombre
              </Label>
              <Input
                defaultValue={selectEntity?.protocol}
                id="protocol"
                placeholder="Marta"
                onChange={(val) => updatedEntity.protocol = val.target.value}
                invalid={errors.protocol && true}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="birth_date">
                Fecha y Hora de la Cita
              </Label>
              <div ref={flatpickrRef}>
                <Flatpickr
                  required
                  locale="es"
                  id="birth_date"
                  name="birth_date"
                  className="form-control"
                  onChange={(selectedDates, dateStr, instance) => {
                    const updatedDateTime = new Date(dateStr);
                    updatedEntity.date = updatedDateTime.toISOString();
                  }}
                  value={new Date(updatedEntity?.date ?? '2023-01-01')}
                  options={{
                    enableTime: true,
                    time_24hr: true, 
                    dateFormat: 'Y-m-d H:i',
                    locale: {
                      firstDayOfWeek: 1,
                      weekdays: {
                        shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                        longhand: [
                          'Domingo',
                          'Lunes',
                          'Martes',
                          'Miércoles',
                          'Jueves',
                          'Viernes',
                          'Sábado',
                        ],
                      },
                      months: {
                        shorthand: [
                          'Ene',
                          'Feb',
                          'Mar',
                          'Abr',
                          'May',
                          'Jun',
                          'Jul',
                          'Ago',
                          'Sep',
                          'Оct',
                          'Nov',
                          'Dic',
                        ],
                        longhand: [
                          'Enero',
                          'Febrero',
                          'Мarzo',
                          'Abril',
                          'Mayo',
                          'Junio',
                          'Julio',
                          'Agosto',
                          'Septiembre',
                          'Octubre',
                          'Noviembre',
                          'Diciembre',
                        ],
                      },
                    },
                  }}
                />
              </div>
            </Col>

            <Col xs={12}>
              <Label className="form-label" for="label">
                Tipo de Tratamiento
              </Label>
              <Select
                id="label"
                options={AppointmentTreatment}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                isClearable={false}
                onChange={(data) => {
                  updatedEntity.treatment = data.value;
                }}
                defaultValue={AppointmentTreatment[selectEntity?.treatment] ?? AppointmentTreatment[selectEntity?.treatment]}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="student">
                Alumno
              </Label>
              <Select
                id="student"
                className="react-select"
                classNamePrefix="select"
                isLoading={isStudentLoading} 
                placeholder='Cargando alumno ...'
                value={studentOption}
                onChange={(selectedStudent) => {
                  setStudentOption(selectedStudent);
                  setUpdatedEntity((prevEntity) => ({
                    ...prevEntity,
                    id_student: selectedStudent.value,
                  }));
                }}
                options={students}
              />
              {isStudentLoading} 

            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="phone">
                Cliente
              </Label>
              <Select
                id="client"
                className="react-select"
                classNamePrefix="select"
                isLoading={isClientLoading} 
                placeholder='Cargando cliente ...'
                value={clientOption}
                onChange={(selectedClient) => {
                  setUpdatedEntity((prevEntity) => ({
                    ...prevEntity,
                    id_client: selectedClient.value,
                  }));
                  setClientOption(selectedClient);
                }}
                options={clients}
              />
              {isClientLoading} 

            </Col>
            <Col md={12} xs={12}>
              <Label className="form-label" for="description">
                Descripción
              </Label>
              <Input
                type="textarea"
                name="text"
                id="description"
                rows="3"
                defaultValue={selectEntity?.consultancy}
                onChange={(e) => updatedEntity.consultancy = e.target.value}
                placeholder="Descripción"
                style={{ resize: 'vertical' }}
              />
            </Col>
            <Card>
              <CardHeader>
                <CardTitle tag='h4'>Imagenes</CardTitle>
              </CardHeader>
              <CardBody>
                {photos && photos.length >= 1 ? <Swiper dir={'ltr'} {...params}>
                  {photos.map((item, index) => (
                    <SwiperSlide key={index}>
                      <img src={item.url} alt={`swiper ${index + 1}`} id={item.id} className='img-fluid' />
                      <button type="button" className="btn btn-danger btn-sm delete-button w-100" onClick={async () => { (await handleConfirmCancel()) ? await removeSlide(item) : ''; }}>Borrar</button>
                    </SwiperSlide>
                  ))}
                </Swiper> : <span>Sin Resultados...</span>}

                <div className='demo-inline-spacing'>
                  {selectEntity ? <ImageUploader id={selectEntity.id} update={fetchPhotos} /> : <></>}
                </div>
              </CardBody>
            </Card>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                Guardar
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={() => {
                  handleReset();
                  closeModal();
                  toast.error('Datos no guardados')
                }}
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AppointmentCard;
