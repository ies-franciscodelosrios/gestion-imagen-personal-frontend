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
import { validateDNI, validateUserData } from '../../../../utility/Utils';
import { apiGetAllVocationalEducation } from '../../../../services/api';

const UserInfoCard = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector(state => state.users)


  // ** State
  const selectedVocationalEducation = store.selectedVocationalEducation;
  const [show, setShow] = useState(false)
  const [cycleOptions, setCycleOptions] = useState(null);

  const getAllVocEdu = () => {
    apiGetAllVocationalEducation()
      .then((response) => {
        console.log(response.data.data);
        const cycleOption = response.data.data.map((item) => {
          return {
            label: item.long_name,
            value: item.long_name,
          };
        });
        setCycleOptions(cycleOption);
      })
      .catch((error) => {
        console.log('Error: ' + error)
      })
  }

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
      cycle: '',
      course_year: '',
      password: '',
      repassword: '',
    }
  })

  // ** render user img
  const renderUserImg = () => {
    return (
      <Avatar
        initials
        color={'light-primary'}
        className='rounded mt-3 mb-2'
        content={selectedVocationalEducation.name}
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
    updatedUser.course_year = data.course_year;
    updatedUser.password = data.password;
    updatedUser.repassword = data.repassword;

    if (validateUserData(data)) {
      dispatch(updateUser(updatedUser));
      setShow(false);
    } else {
      for (const key in data) {
        if (!validateDNI(data.dni)) setError('dni', {})
        if (data[key].length === 0 && !key.includes('pass')) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset({
      name: selectedVocationalEducation.name,
      surname: selectedVocationalEducation.surname,
      email: selectedVocationalEducation.email,
      dni: selectedVocationalEducation.dni,
      cycle: selectedVocationalEducation.cycle.label,
      course_year: selectedVocationalEducation.course_year,
      password: '',
      repassword: '',
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
                    {selectedVocationalEducation !== null
                      ? selectedVocationalEducation.name.concat(' ' + selectedVocationalEducation.surname)
                      : 'Eleanor Aguilar'}
                  </h4>

                </div>
              </div>
            </div>
          </div>

          <h4 className="fw-bolder border-bottom pb-50 mb-1">Detalles</h4>
          <div className="info-container">
            {selectedVocationalEducation !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Nombre: </span>
                  <span>{selectedVocationalEducation.name}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Apellido: </span>
                  <span>{selectedVocationalEducation.surname}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">DNI: </span>
                  <span>{selectedVocationalEducation.dni}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email: </span>
                  <span>{selectedVocationalEducation.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Ciclo: </span>
                  <span>{selectedVocationalEducation.cycle}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => { handleReset(); setShow(true); getAllVocEdu(); }}>
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
                  defaultValue={selectedVocationalEducation.name}
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
                  defaultValue={selectedVocationalEducation.surname}
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
                  defaultValue={selectedVocationalEducation.email}
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
                  defaultValue={selectedVocationalEducation.dni}
                  control={control}
                  id="dni"
                  name="dni"
                  render={({ field }) => (
                    <Input {...field} id="dni" placeholder="31000000C" invalid={errors.dni && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="cycle">
                  Ciclo <span className="text-danger">*</span>
                </Label>
                <Controller
                  defaultValue={{ label: selectedVocationalEducation.cycle, value: selectedVocationalEducation.cycle }} // Set the default value to the first option in the array
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

}

export default UserInfoCard
