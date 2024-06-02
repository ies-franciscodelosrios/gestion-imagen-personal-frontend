import { useState, useEffect, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import Avatar from '@components/avatar';
import '@styles/react/libs/react-select/_react-select.scss';
import { toast } from 'react-hot-toast';
import { AddClient, updateClientBy } from '../../../../services/api';
import { validateClientData, validateDNI } from '../../../../utility/Utils';

const ClientInfoCard = ({ id, entity, setEntity }) => {
  const [show, setShow] = useState(false);
  const [maxDate, setMaxDate] = useState(getTodayDate());

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    return `${year}-${month}-${day}`;
  }

  const isEditing = entity && entity.id !== undefined && entity.id !== null && entity.id !== "";

  useEffect(() => {
    if (id === "0") {
      setShow(true);
    }
  }, []);

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: entity ? entity.name : '',
      surname: entity ? entity.surname : '',
      email: entity ? entity.email : '',
      dni: entity ? entity.dni : '',
      phone: entity ? entity.phone : '',
    },
  });

  const renderUserImg = () => {
    return (
      <Avatar
        initials={true}
        color={'light-primary'}
        className="rounded mt-3 mb-2"
        content={entity?.name || ''}
        contentStyles={{
          borderRadius: 0,
          fontSize: 'calc(48px)',
          width: '100%',
          height: '100%',
        }}
        style={{
          height: '110px',
          width: '110px',
        }}
      />
    );
  };

  const onSubmit = async (data) => {
    const newEntity = { ...entity };
    const newData = { ...data };

    if (!data.name || data.name.length === 0 || !data.surname || data.surname.length === 0) {
      setError('name', {
        type: 'manual'
      });
      setError('surname', {
        type: 'manual'
      });
      toast.error('Por favor, complete los campos de nombre y apellido.');
      return;
    }

    if (isEditing || (data.email && data.email.length > 0) || (data.dni && data.dni.length > 0) || (data.phone && data.phone.length > 0) || (data.birth_date && data.birth_date.length > 0)) {
      if (data.dni && !validateDNI(data.dni)) {
        setError('dni', {});
        toast.error('Por favor, introduzca un DNI válido.');
        return;
      }

      if (data.birth_date && data.birth_date.length > 0) {
        const selectedDate = new Date(data.birth_date);
        const currentDate = new Date();
        if (selectedDate > currentDate) {
          setError('birth_date', {});
          toast.error('La fecha de nacimiento no puede ser en el futuro.');
          return;
        }
      }
    }

    try {
      if (id === "0") {
        await AddClient({ ...newEntity, ...newData });
        toast.success('Cliente creado');
        setTimeout(() => {
          window.location.pathname = `/apps/client/list`;
        }, 350);
      } else {
        await updateClientBy({ ...newEntity, ...newData });
        setEntity(newData);
        toast.success('Datos guardados');
      }
      setShow(false);
    } catch (error) {
      toast.error('Error al procesar la solicitud');
    }
  };

  const handleReset = () => {
    reset({ ...entity });
  };

  const handleClose = () => {
    setShow(false);
    if (id === "0") {
      window.location.pathname = '/apps/client/list';
    }
  };

  const today = new Date();

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {entity && entity.name && entity.surname
                      ? entity.name.concat(' ' + entity.surname)
                      : ''}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <h4 className="fw-bolder border-bottom pb-50 my-1">Detalles</h4>
          <div className="info-container">
            {entity !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Nombre: </span>
                  <span>{entity && entity.name}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Apellido: </span>
                  <span>{entity && entity.surname}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">DNI: </span>
                  <span>{entity && entity.dni}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email: </span>
                  <span>{entity && entity.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Año Nacimiento: </span>
                  <span>{entity && entity.birth_date}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Telefono: </span>
                  <span>{entity && entity.phone}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => { handleReset(); setShow(true) }}>
              Editar
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={handleClose}
        className="modal-dialog-centered modal-lg"
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={handleClose}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">
              {id == "0" ? "Añadir cliente" : "Editar cliente"}
            </h1>
            <p>{id == "0" ? "Añadir datos de un cliente de manera segura" : "Actualizar los datos del Cliente de manera segura."}</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="Name">
                  Nombre
                </Label>
                <Controller
                  defaultValue={entity && entity.name}
                  control={control}
                  id="name"
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="name"
                      placeholder="Marta"
                      invalid={errors.name && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="surname">
                  Apellidos
                </Label>
                <Controller
                  defaultValue={entity && entity.surname}
                  control={control}
                  id="surname"
                  name="surname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="surname"
                      placeholder="Torres"
                      invalid={errors.surname && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Controller
                  defaultValue={entity && entity.email !== null ? entity.email : ''}
                  control={control}
                  id="email"
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      type="email"
                      id="email"
                      placeholder="nombre@gmail.com"
                      invalid={errors.email && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="dni">
                  Dni
                </Label>
                <Controller
                  defaultValue={entity && entity.dni !== null ? entity.dni : ''}
                  control={control}
                  id="dni"
                  name="dni"
                  render={({ field }) => (
                    <Input {...field} value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      invalid={errors.dni && true} id="dni" placeholder="31000000C" />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="phone">
                  Teléfono
                </Label>
                <Controller
                  defaultValue={entity && entity.phone !== null ? entity.phone : ''}
                  control={control}
                  type='number'
                  id="phone"
                  name="phone"
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      type="number"
                      id="phone"
                      placeholder="609 933 442"
                      invalid={errors.phone && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="birth_date">
                  Fecha de Nacimiento
                </Label>
                <Controller
                  control={control}
                  defaultValue=""
                  name="birth_date"
                  render={({ field }) => (
                    <Flatpickr
                      required
                      locale="es"
                      id="birth_date"
                      name="birth_date"
                      placeholder="DD/MM/AAAA" 
                      onChange={date => {
                        const selectedDate = new Date(date[0]);
                        selectedDate.setDate(selectedDate.getDate() + 1);
                        field.onChange(selectedDate.toISOString().split("T")[0]);
                      }}
                      value={field.value ? new Date(field.value) : null}
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
                        maxDate: today, 
                      }}
                      className="form-control" 
                    />
                  )}
                />
              </Col>
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
                    if (id === "0") {
                      window.location.pathname = '/apps/client/list';
                    }
                    setShow(false);
                    toast.error('Datos no guardados');
                  }}
                >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ClientInfoCard;
