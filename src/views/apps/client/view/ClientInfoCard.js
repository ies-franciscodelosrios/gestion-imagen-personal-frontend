// ** React Imports
import { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateClient } from '../store';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from 'reactstrap';

// ** Third Party Components
import Swal from 'sweetalert2';
import Select from 'react-select';
import { Check, Briefcase, X } from 'react-feather';
import { useForm, Controller } from 'react-hook-form';
import withReactContent from 'sweetalert2-react-content';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import { toast } from 'react-hot-toast';
import { getRol } from '../../../../utility/Utils';

const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary',
};

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary',
};

const MySwal = withReactContent(Swal);

const ClientInfoCard = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector(state => state.clients)

  const selectedClient = store.selectedClient;

  // ** State
  const [show, setShow] = useState(false);

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: selectedClient.name,
      surname: selectedClient.surname,
      email: selectedClient.email,
      dni: selectedClient.dni,
      phone: selectedClient.phone,
    },
  });

  // ** render user img
  const renderUserImg = () => {
    return (
      <Avatar
        initials
        color={'light-primary'}
        className="rounded mt-3 mb-2"
        content={selectedClient.name}
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

  const onSubmit = (data) => {
    const updatedClient = {...store.selectedClient};
    updatedClient.name = data.name;
    updatedClient.surname = data.surname;
    updatedClient.email = data.email;
    updatedClient.dni = data.dni;
    updatedClient.phone = data.phone;
    if (Object.values(data).every((field) => field.toString().length > 0)) {
      console.log(updatedClient.id);
      dispatch(updateClient(updatedClient));
      setShow(false);
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
          });
        }
      }
    }
  };

  const handleReset = () => {
    reset({
      name: selectedClient.name,
      surname: selectedClient.surname,
      email: selectedClient.email,
      dni: selectedClient.dni,
      phone: selectedClient.phone,
    });
  };

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
                    {selectedClient !== null
                      ? selectedClient.name.concat(' ' + selectedClient.surname)
                      : 'Eleanor Aguilar'}
                  </h4>
                  {selectedClient !== null ? (
                    <Badge
                      color={roleColors[selectedClient.rol]}
                      className="text-capitalize"
                    >
                      {selectedClient.rol}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">123</h4>
                <small>Tratamientos</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">568</h4>
                <small>Projects Done</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">Detalles</h4>
          <div className="info-container">
            {selectedClient !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Nombre: </span>
                  <span>{selectedClient.name}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Apellido: </span>
                  <span>{selectedClient.surname}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">DNI: </span>
                  <span>{selectedClient.dni}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email: </span>
                  <span>{selectedClient.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Año Nacimiento: </span>
                  <span>{selectedClient.birth_date}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Telefono: </span>
                  <Badge
                    className="text-capitalize"
                    color={statusColors['active']}
                  >
                    {selectedClient.phone}
                  </Badge>
                </li>
              </ul>
            ) : null}
          </div>
          {getRol() <= 1 ? 
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => {handleReset(); setShow(true)}}>
              Editar
            </Button>
          </div>
          : null}
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Editar Información</h1>
            <p>Actualizar los datos del Cliente de manera segura.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="Name">
                  Nombre
                </Label>
                <Controller
                  defaultValue={selectedClient.name}
                  control={control}
                  id="Name"
                  name="Name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="Name"
                      placeholder="Marta"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="surname">
                  Apellidos
                </Label>
                <Controller
                  defaultValue={selectedClient.surname}
                  control={control}
                  id="surname"
                  name="surname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="surname"
                      placeholder="Torres"
                      invalid={errors.lastName && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Controller
                  defaultValue={selectedClient.email}
                  control={control}
                  id="email"
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
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
                  defaultValue={selectedClient.dni}
                  control={control}
                  id="dni"
                  name="dni"
                  render={({ field }) => (
                    <Input {...field} id="dni" placeholder="31000000C" />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="phone">
                  Teléfono
                </Label>
                <Controller
                  defaultValue={selectedClient.phone}
                  control={control}
                  type='number'
                  id="phone"
                  name="phone"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      id="phone"
                      placeholder="609 933 442"
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
                    setShow(false);
                    toast.error('Borrado de datos no guardados')
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
