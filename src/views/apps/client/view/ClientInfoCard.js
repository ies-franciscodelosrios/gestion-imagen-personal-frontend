// ** React Imports
import { useState, Fragment, useEffect } from 'react';

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
import { useForm, Controller } from 'react-hook-form';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import { toast } from 'react-hot-toast';
import { updateClientBy } from '../../../../services/api';
import { validateClientData, validateDNI } from '../../../../utility/Utils';


const ClientInfoCard = ({ entity, setEntity }) => {
  // ** State
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("client info card")
    console.log(entity)
  });


  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      dni: entity.dni,
      phone: entity.phone,
    },
  });

  // ** render user img
  const renderUserImg = () => {
    return (
      <Avatar
        initials={true}
        color={'light-primary'}
        className="rounded mt-3 mb-2"
        content={entity.name || ''}
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
    if (validateClientData(data)) {
      const newEntity={...entity}
      const newData={...data}
      await updateClientBy({ ...newEntity, ...newData }).then(e => { setEntity(newData); toast.success('Datos guardados') }).catch(e => { toast.error('Error al guardar') });
      setShow(false);
    } else {
      for (const key in data) {
        if (!validateDNI(data.dni)) setError('dni', {})
        if (data[key] &&  data[key].length === 0) {
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
                  <span>{entity.name}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Apellido: </span>
                  <span>{entity.surname}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">DNI: </span>
                  <span>{entity.dni}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email: </span>
                  <span>{entity.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Año Nacimiento: </span>
                  <span>{entity.birth_date}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Telefono: </span>
                  <span>{entity.phone}</span>
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
                  defaultValue={entity.name}
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
                  defaultValue={entity.surname}
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
                  defaultValue={entity.email}
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
                  defaultValue={entity.dni}
                  control={control}
                  id="dni"
                  name="dni"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.dni && true} id="dni" placeholder="31000000C" />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="phone">
                  Teléfono
                </Label>
                <Controller
                  defaultValue={entity.phone}
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
                      invalid={errors.phone && true}
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
    </Fragment>
  );
};

export default ClientInfoCard;
