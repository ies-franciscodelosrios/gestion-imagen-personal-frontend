// ** React Imports
import { useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../store';

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
  ModalHeader
} from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { toast } from 'react-hot-toast';

const cycleOptions = [
  { label: 'Grado Medio - Peluquería y cosmética capilar', value: 'Grado Medio - Peluquería y cosmética capilar' },
  { label: 'Grado Medio - Estética y belleza', value: 'Grado Medio - Estética y belleza' },
  { label: 'Grado Superior - Estética integral y bienestar', value: 'Grado Superior - Estética integral y bienestar' },
  { label: 'Grado Superior - Estilismo y dirección de peluquería', value: 'Grado Superior - Estilismo y dirección de peluquería' },
];


const UserInfoCard = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector(state => state.users)


  // ** State
  const selectedUser = store.selectedUser;
  const [show, setShow] = useState(false)

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      dni: '',
      cycle: ''
    }
  })

  // ** render user img
  const renderUserImg = () => {
    return (
      <Avatar
        initials
        color={'light-primary'}
        className='rounded mt-3 mb-2'
        content={selectedUser.name}
        contentStyles={{
          borderRadius: 0,
          fontSize: 'calc(48px)',
          width: '100%',
          height: '100%'
        }}
        style={{
          height: '110px',
          width: '110px'
        }}
      />
    )
  }

  const onSubmit = (data) => {
    const updatedUser = { ...store.selectedUser };
    updatedUser.name = data.name;
    updatedUser.surname = data.surname;
    updatedUser.email = data.email;
    updatedUser.dni = data.dni;
    updatedUser.cycle = data.cycle.label;

    if (Object.values(data).every(field => typeof field !== "object" || Object.values(field).every(value => value.length > 0))) {
      console.log(updatedUser.id);
      dispatch(updateUser(updatedUser));
      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })

        }
      }
    }
  }

  const handleReset = () => {
    reset({
      name: selectedUser.name,
      surname: selectedUser.surname,
      email: selectedUser.email,
      dni: selectedUser.dni,
      cycle: selectedUser.cycle.label,
    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info mb-3">
                  <h4>
                    {selectedUser !== null
                      ? selectedUser.name.concat(' ' + selectedUser.surname)
                      : 'Eleanor Aguilar'}
                  </h4>

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
            {/* <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">568</h4>
                <small>Projects Done</small>
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
                  <span className="fw-bolder me-25">DNI: </span>
                  <span>{selectedUser.dni}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email: </span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Ciclo: </span>
                  <span>{selectedUser.cycle}</span>
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
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader
          className='bg-transparent'
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Editar Información</h1>
            <p>Actualiza los datos del estudiante de manera segura.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='name'>
                  Nombre
                </Label>
                <Controller
                  defaultValue={selectedUser.name}
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
                  defaultValue={selectedUser.surname}
                  control={control}
                  id='surname'
                  name='surname'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='surname'
                      placeholder='Doe'
                      invalid={errors.lastName && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='email'>
                  Email
                </Label>
                <Controller
                  defaultValue={selectedUser.email}
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
                  defaultValue={selectedUser.dni}
                  control={control}
                  id="dni"
                  name="dni"
                  render={({ field }) => (
                    <Input {...field} id="dni" placeholder="31000000C" />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="cycle">
                  Ciclo <span className="text-danger">*</span>
                </Label>
                <Controller
                  defaultValue={{label:selectedUser.cycle, value:selectedUser.cycle}} // Set the default value to the first option in the array
                  control={control}
                  id="cycle"
                  name="cycle"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={cycleOptions}
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      id="cycle"
                      name='cycle'
                      placeholder="Elige tu ciclo"
                      invalid={errors.cycle && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type="submit" className="me-1" color="primary" onClick={() => toast.success('Correctamente Guardado!')}>
                  Guardar
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
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

}

export default UserInfoCard
