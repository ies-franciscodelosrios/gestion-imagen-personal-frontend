// ** React Imports
import { useState, useEffect } from 'react';
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
import { deleteAppointmentCloudinary, getAppointmentCloudinary, updateAppointment, updateAppointment2 } from '../../../../services/api';
import ImageUploader from '../../../../services/CloudiaryUploader';
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
  // ** State
  const [show, setShow] = useState(shows);
  const [selectEntity, setSelectEntity] = useState(entity);
  const [updatedEntity, setUpdatedEntity] = useState({ ...entity });
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setShow(shows);
    setSelectEntity(entity);
    reset({ ...entity });
    fetchPhotos();
  }, [shows, entity])

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
    },
  });

  const onSubmit = async () => {
    console.log(updatedEntity);
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
                Fecha de la Cita
              </Label>
              <Flatpickr
                required
                locale="es"
                id="birth_date"
                name="birth_date"
                className="form-control"
                onChange={(newdate) => updatedEntity.date = (newdate[0]?.toISOString())}
                value={new Date(updatedEntity?.date ?? '2023-01-01')}
                options={{
                  enableTime: false,
                  dateFormat: 'Y-m-d',
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
                onChange={(data) => console.log(data)}
                value={AppointmentTreatment[selectEntity?.treatment] ?? AppointmentTreatment[selectEntity?.treatment]}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="phone">
                Alumno
              </Label>
              <Input
                disabled
                defaultValue={selectEntity?.student?.name.concat(' ' + selectEntity?.student?.surname)}
                id="protocol"
                placeholder="Marta"
                invalid={errors.student && true}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="phone">
                Cliente
              </Label>
              <Input
                disabled
                defaultValue={selectEntity?.client?.name.concat(' ' + selectEntity?.client?.surname)}
                id="protocol"
                placeholder="Marta"
                invalid={errors.client && true}
              />
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
                      <button type="button" className="btn btn-danger btn-sm delete-button w-100" onClick={() => removeSlide(item)}>Borrar</button>
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
