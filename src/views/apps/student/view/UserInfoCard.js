// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, addUser } from '../store';
import { useNavigate } from "react-router";


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

const UserInfoCard = ({ id }) => {
  const navigateTo = useNavigate();
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector(state => state.users)


  // ** State
  const selectedUser =
  id == "0"
    ? {
      name: "",
      surname: "",
      email: "",
      dni: "",
      course_year: "",
      cycle: "",
      password: "",
      repassword: "",
    }
    : store.selectedUser;
  const [show, setShow] = useState(false)
  const [cycleOptions, setCycleOptions] = useState(null);
  const isEditing = selectedUser.password != ""; // Asume que selectedUser es null si estás añadiendo un nuevo profesor


  const getAllVocEdu = () => {
    apiGetAllVocationalEducation()
      .then((response) => {
        const cycleOption = response.data.data.map((item) => {
          return {
            label: item.long_name,
            value: item.id,
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

  useEffect(() => {
    getAllVocEdu();
    if (id == "0") {
      setShow(true);
    }

  }, []);

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
    const selectedUser = { ...store.selectedUser };
    selectedUser.name = data.name;
    selectedUser.surname = data.surname;
    selectedUser.email = data.email;
    selectedUser.dni = data.dni;
    selectedUser.course_year = data.course_year;
    selectedUser.cycle = data.cycle.value;
    selectedUser.cycle_name = data.cycle.label;
    selectedUser.password = data.password;
    selectedUser.repassword = data.repassword;
    console.log("data.cycle.value: "+ data.cycle.value);

    if (validateUserData(data, isEditing)) {
      if (id == "0") {
        console.log("Add");
        dispatch(addUser(selectedUser));
        setShow(false);
        navigateTo("/apps/student/list");
      } else {
        console.log("Update");
        delete selectedUser.password;
        delete selectedUser.repassword;
        console.log(selectedUser);
        dispatch(updateUser(selectedUser));
        setShow(false);
      }
    } else {
      for (const key in data) {
        if (!validateDNI(data.dni)) setError("dni", {});
        if (data.password.length != 0 || data.repassword.length != 0) {
          setError("password", {});
          setError("repassword", {});
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
      cycle: selectedUser.cycle.cycle_name,
      course_year: selectedUser.course_year,
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
                    {selectedUser !== null
                      ? selectedUser.name.concat(' ' + selectedUser.surname)
                      : 'Eleanor Aguilar'}
                  </h4>

                </div>
              </div>
            </div>
          </div>

          <h4 className="fw-bolder border-bottom pb-50 mb-1">Detalles</h4>
          <div className="info-container">
          {selectedUser !== null && cycleOptions && isEditing ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Nombre: </span>
                  <span>{selectedUser.name}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Apellidos: </span>
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
                  <span className="fw-bolder me-25">Curso: </span>
                  <span>{selectedUser.course_year}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Ciclo: </span>
                  <span>
                    {cycleOptions[selectedUser.cycle - 1].label}
                  </span>
                </li>
              </ul>
            ) : <img style={{ width: 50, display: 'block', margin: '0 auto' }} src="../../../../src/assets/images/GIF/loading.gif" alt="GIF cargando" />}
          
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => { handleReset(); setShow(true); getAllVocEdu(); console.log("valor: "+cycleOptions[selectedUser.cycle - 1].label)}}>
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
            <h1 className='mb-1'>{id == "0" ? "Añadir Estudiante" : "Editar estudiante"}</h1>
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
                    <Input {...field} id="dni" placeholder="31000000C" invalid={errors.dni && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="cycle">
                  Ciclo <span className="text-danger">*</span>
                </Label>
                <Controller
                  defaultValue={{
                    label: selectedUser.cycle_name,
                    value: selectedUser.cycle.value,
                  }} // Set the default value to the first option in the array
                  control={control}
                  id="cycle"
                  name="cycle"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={cycleOptions}
                      className="react-select"
                      classNamePrefix="select"
                      id="cycle"
                      name="cycle"
                      placeholder="Elige tu ciclo"
                      defaultValue={{value: 6 }}
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
                    <Input
                      {...field}
                      id="course_year"
                      placeholder="23-24"
                      invalid={errors.course_year && true}
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
                    navigateTo("/apps/student/list");
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
