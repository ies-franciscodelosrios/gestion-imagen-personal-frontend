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
import { validateDNI, validateUserData } from '../../../../utility/Utils';
import { updateUserBy } from '../../../../services/api';


const cycleOptions = [
  { label: 'Grado Medio - Peluquería y cosmética capilar', value: 'Grado Medio - Peluquería y cosmética capilar' },
  { label: 'Grado Medio - Estética y belleza', value: 'Grado Medio - Estética y belleza' },
  { label: 'Grado Superior - Estética integral y bienestar', value: 'Grado Superior - Estética integral y bienestar' },
  { label: 'Grado Superior - Estilismo y dirección de peluquería', value: 'Grado Superior - Estilismo y dirección de peluquería' },
];

const MySwal = withReactContent(Swal);

const UserInfoCard = ({entity, setEntity}) => {
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
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      dni: entity.dni,
      course_year: entity.course_year,
      password: '',
      repassword: '',
    },
  });

  // ** render user img
  const renderUserImg = () => {
    return (
      <Avatar
        initials
        color={'light-primary'}
        className="rounded mt-3 mb-2"
        content={entity.name}
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
    console.log(data);
    if (validateUserData(data)) {
      await updateUserBy({ ...entity, ...data }).then(e => { setEntity(e.data); toast.success('Datos guardados') }).catch(e => { toast.error('Error al guardar') });
      setShow(false);
    } else {
      for (const key in data) {
        if (!validateDNI(data.dni))setError('dni',{})
        if (data.password.length!=0 || data.repassword.length!=0){setError('password',{}); setError('repassword',{});}
        if (data[key].length === 0 && !key.includes('pass')) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset({...entity});
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
                    {entity !== null
                      ? entity.name.concat(' ' + entity.surname)
                      : 'Eleanor Aguilar'}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">Detalles</h4>
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
                  <span className="fw-bolder me-25">dni: </span>
                  <span>{entity.dni}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">email: </span>
                  <span>{entity.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Curso: </span>
                  <span>{entity.course_year}</span>
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
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='name'>
                  Nombre
                </Label>
                <Controller
                  defaultValue={entity.name}
                  control={control}
                  id='name'
                  name='name'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='name'
                      placeholder='Laura'
                      invalid={errors.name && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='surname'>
                  Apellidos
                </Label>
                <Controller
                  defaultValue={entity.surname}
                  control={control}
                  id='surname'
                  name='surname'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='surname'
                      placeholder='Torres'
                      invalid={errors.surname && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='email'>
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
                    <Input {...field} id="dni" placeholder={entity.dni} invalid={errors.dni && true}/>
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="cycle">
                  Ciclo <span className="text-danger">*</span>
                </Label>
                <Controller
                  defaultValue={entity.cycle} // Set the default value to the first option in the array
                  control={control}
                  id="cycle"
                  name="cycle"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={cycleOptions}
                      className='react-select'
                      classNamePrefix='select'
                      id="cycle"
                      name='cycle'
                      placeholder={entity.cycle}
                      invalid={errors.cycle && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='password'>
                  Contraseña
                </Label>
                <Controller
                  control={control}
                  id='password'
                  name='password'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='password'
                      placeholder='Contraseña...'
                      invalid={errors.password && true}
                    />
                  )}
                />
              </Col>              
              <Col md={6} xs={12}>
                <Label className='form-label' for='repassword'>
                  Repite Contraseña
                </Label>
                <Controller
                  control={control}
                  id='repassword'
                  name='repassword'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='repassword'
                      placeholder='Repite Contraseña...'
                      invalid={errors.repassword && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type="submit" className="me-1" color="primary">
                  Guardar
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
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
