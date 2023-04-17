// ** React Imports
import { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateProfesor } from '../store';

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

const UserInfoCard = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector(state => state.profesor)

  const selectedUser = store.selectedProfesor;

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
      name: selectedUser.name,
      surname: selectedUser.surname,
      email: selectedUser.email,
      dni: selectedUser.dni,
    },
  });

  // ** render user img
  const renderUserImg = () => {
    return (
      <Avatar
        initials
        color={'light-primary'}
        className="rounded mt-3 mb-2"
        content={selectedUser.name}
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
    
    console.log({...store.selectedProfesor})

    const updatedTeacher = {...store.selectedProfesor};
    console.log(updatedTeacher)
    updatedTeacher.name = data.name;
    updatedTeacher.surname = data.surname;
    updatedTeacher.email = data.email;
    updatedTeacher.dni = data.dni;
    updatedTeacher.course_year = data.course_year;
    updatedTeacher.cycle = data.cycle;


    if (Object.values(updatedTeacher).every((field) => field.toString().length > 0)) {
      console.log(updatedTeacher.id);
      dispatch(updateProfesor(updatedTeacher));
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
      name: selectedUser.name,
      surname: selectedUser.surname,
      email: selectedUser.email,
      dni: selectedUser.dni,
      cycle:selectedUser.cycle,
      course_year:selectedUser.course_year,
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
                    {selectedUser !== null
                      ? selectedUser.name.concat(' ' + selectedUser.surname)
                      : 'Eleanor Aguilar'}
                  </h4>
                {/*   {selectedUser !== null ? (
                    <Badge
                      color={roleColors[selectedUser.rol]}
                      className="text-capitalize"
                    >
                      {rolChanger( selectedUser.rol)}
                    </Badge>
                  ) : null} */}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">

            {/* <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">5</h4>
                <small>Tratamientos en revision</small>
              </div>
            </div> */}
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">Detalles</h4>
          <div className="info-container">
            {selectedUser !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Nombre: </span>
                  <span>{selectedUser.name}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Apellido: </span>
                  <span>{selectedUser.surname}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">dni: </span>
                  <span>{selectedUser.dni}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">email: </span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Curso: </span>
                  <span>{selectedUser.course_year}</span>
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
            <p>Actualizar los datos del Profesor de manera segura.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="Name">
                  Nombre
                </Label>
                <Controller
                  defaultValue=''
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
                  defaultValue={selectedUser.surname}
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
              <Col md={6} xs={12}>
                <Label className="form-label" for="Email">
                  Email
                </Label>
                <Controller
                  defaultValue={selectedUser.email}
                  control={control}
                  id="Email"
                  name="Email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      id="Email"
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
                  defaultValue={selectedUser.dni}
                  control={control}
                  id="dni"
                  name="dni"
                  render={({ field }) => (
                    <Input {...field} id="dni" placeholder="31000000C" />
                  )}
                />
              </Col>
         
              <Col md={6} xs={12}>
                <Label className="form-label" for="course_year">
                  Curso
                </Label>
                <Controller
                  defaultValue={selectedUser.course_year}
                  control={control}
                  id="course_year"
                  name="course_year"
                  render={({ field }) => (
                    <Input {...field} id="course_year" placeholder="2023-02-23" />
                  )}
                />
              </Col>

              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary" onClick={() => toast.success('Correctamente Guardado!')}>
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
function rolChanger(rol) {
  let rolTitle = "";
  if (rol == 0) {
    rolTitle = "Administrador";
  } else if (rol == 1) {
    rolTitle = "Profesor";
  }
  return rolTitle;
}
export default UserInfoCard;
