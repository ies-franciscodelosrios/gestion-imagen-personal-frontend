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

const cycleOptions = [
  { label: 'Grado Medio - Peluquería y cosmética capilar', value: 'Grado Medio - Peluquería y cosmética capilar' },
  { label: 'Grado Medio - Estética y belleza', value: 'Grado Medio - Estética y belleza' },
  { label: 'Grado Superior - Estética integral y bienestar', value: 'Grado Superior - Estética integral y bienestar' },
  { label: 'Grado Superior - Estilismo y dirección de peluquería', value: 'Grado Superior - Estilismo y dirección de peluquería' },
];

const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
}

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}


const MySwal = withReactContent(Swal)

const UserInfoCard = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector(state => state.users)

  const selectedUser = store.selectedUser;

  // ** State
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
      Name: '',
      Surname: '',
      email: '',
      DNI: '',
      Cycle: ''
    }
  })

  // ** render user img
  const renderUserImg = () => {
      return (
        <Avatar
          initials
          color={'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedUser.Name}
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
    const updatedUser = {...store.selectedUser};
    updatedUser.Name = data.Name;
    updatedUser.Surname = data.Surname;
    updatedUser.email = data.email;
    updatedUser.DNI = data.DNI;
    updatedUser.Cycle = data.Cycle.label;
    console.log(data);

    if (Object.values(data).every(field => typeof field !== "object" || Object.values(field).every(value => value.length > 0))){
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
      Name: selectedUser.Name,
      Surname: selectedUser.Surname,
      email: selectedUser.email,
      DNI: selectedUser.DNI,
      Cycle: selectedUser.Cycle.label,
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
                <div className="user-info">
                  <h4>
                    {selectedUser !== null
                      ? selectedUser.Name.concat(' ' + selectedUser.Surname)
                      : 'Eleanor Aguilar'}
                  </h4>
                  {selectedUser !== null ? (
                    <Badge
                      color={roleColors[selectedUser.Rol]}
                      className="text-capitalize"
                    >
                      {selectedUser.Rol}
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
            {selectedUser !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Nombre: </span>
                  <span>{selectedUser.Name}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Apellido: </span>
                  <span>{selectedUser.Surname}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">DNI: </span>
                  <span>{selectedUser.DNI}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email: </span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Ciclo: </span>
                  <span>{selectedUser.Cycle}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => {handleReset(); setShow(true)}}>
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
            <p>Actualizar los datos del User de manera segura.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='Name'>
                  Nombre
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='Name'
                  name='Name'
                  render={({ field }) => (
                    <Input 
                      {...field} 
                      id='Name' 
                      placeholder='John' 
                      invalid={errors.firstName && true} 
                      />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='Surname'>
                  Apellidos
                </Label>
                <Controller
                  defaultValue={selectedUser.Surname}
                  control={control}
                  id='Surname'
                  name='Surname'
                  render={({ field }) => (
                    <Input 
                      {...field} 
                      id='Surname' 
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
                <Label className="form-label" for="DNI">
                  Dni
                </Label>
                <Controller
                  defaultValue={selectedUser.DNI}
                  control={control}
                  id="DNI"
                  name="DNI"
                  render={({ field }) => (
                    <Input {...field} id="DNI" placeholder="31000000C" />
                  )}
                />
              </Col>
              <Col xs={12}>
              <Label className="form-label" for="Cycle">
            Ciclo <span className="text-danger">*</span>
          </Label>
          <Controller
            name="Cycle"
            control={control}
            render={({ field }) => (
              <Select
                options={cycleOptions}
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                id="Cycle"
                placeholder="Elige tu ciclo"
                invalid={errors.Cycle && true}
                {...field}
              />

            )}
          />
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Guardar
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
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
