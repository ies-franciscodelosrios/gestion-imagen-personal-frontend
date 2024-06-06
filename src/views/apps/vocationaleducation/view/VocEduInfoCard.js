// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVocationalEducation, updateVocationalEducation } from '../store';

// ** Reactstrap Imports
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
  ModalHeader
} from 'reactstrap'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { toast } from 'react-hot-toast';
import { validateVocEduData } from '../../../../utility/Utils';

const VocEduInfoCard = ({ id }) => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector(state => state.vocedu)
  const selectedVocEdu =
    id == "0"
      ? {
        short_name: "",
        long_name: "",
        description: "",
      }
      : store.selectedVocationalEducation;

  // ** State
  const [show, setShow] = useState(false)
  const isEditing = id !== "0";

  useEffect(() => {
    if (id == "0") {
      setShow(true);
    }
  }, []);

  // ** Hook
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      short_name: '',
      long_name: '',
      description: '',
    }
  })



  const onSubmit = (data) => {
    const updatedVocEdu = { ...store.selectedVocationalEducation };
    updatedVocEdu.short_name = data.short_name;
    updatedVocEdu.long_name = data.long_name;
    updatedVocEdu.description = data.description;


    if (validateVocEduData(data, isEditing)) {
      if (id == "0") {
        dispatch(addVocationalEducation(updatedVocEdu));
        setShow(false);
        setTimeout(() => {
          window.location.pathname = '/apps/vocationaleducation/list';
        }, 1000);
      } else {
        dispatch(updateVocationalEducation(updatedVocEdu));
        setShow(false);
      }
    }
  }

  const handleReset = () => {
    reset({
      short_name: selectedVocEdu.short_name,
      long_name: selectedVocEdu.long_name,
      description: selectedVocEdu.description,
    })
  }

  return (
    <Fragment>
      <div style={{ display: 'flex' }}>
        <div>
          <Card>
            <CardBody>
              <div className="user-avatar-section">
                <div className="d-flex align-items-center flex-column">
                  <div className="d-flex flex-column align-items-center text-center">
                    <div className="user-info mb-3">
                      <h4>
                        {selectedVocEdu !== null
                          ? selectedVocEdu.short_name
                          : "Eleanor Aguilar"}
                      </h4>

                    </div>
                  </div>
                </div>
              </div>

              <h4 className="fw-bolder border-bottom pb-50 mb-1">Detalles</h4>
              <div className="info-container">
                {selectedVocEdu !== null ? (
                  <ul className="list-unstyled">
                    <li className="mb-75">
                      <span className="fw-bolder me-25">Ciclo: </span>
                      <span>{selectedVocEdu.short_name}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">Nombre Completo: </span>
                      <span>{selectedVocEdu.long_name}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">Descripción: </span>
                      <span>{selectedVocEdu.description}</span>
                    </li>
                  </ul>
                ) : null}
              </div>
              <div className="d-flex justify-content-center pt-2">
                <Button color="primary" onClick={() => { handleReset(); setShow(true); }}>
                  Editar
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        <div style={{ width: '75%', marginLeft: '5%', textAlign: 'center' }}>
          <Card>
            <CardBody>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ color: 'white' }}>
                    <th>Alumnos</th>
                    <th>Profesores</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {selectedVocEdu.users && selectedVocEdu.users.filter(user => user.rol === 2).map((user, index) => (
                        <div style={{ cursor: 'pointer' }} onClick={() => {
                          window.location.pathname = `/apps/student/view/${user.id}`
                        }} key={user.id}>{user.name} {user.surname}</div>
                      ))}
                    </td>
                    <td>
                      {selectedVocEdu.users && selectedVocEdu.users.filter(user => user.rol === 1).map((user, index) => (
                        <div style={{ cursor: 'pointer' }} onClick={() => {
                          window.location.pathname = `/apps/profesor/view/${user.id}`
                        }} key={user.id}>{user.name} {user.surname}</div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>
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
            {isEditing ? (<h1 className='mb-1'>Editar Información</h1>) : (<h1 className='mb-1'>Añadir Nuevo Ciclo</h1>)}
            <p>Actualiza los datos del ciclo de manera segura.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='short_name'>
                  Ciclo
                </Label>
                <Controller
                  defaultValue={selectedVocEdu.short_name}
                  control={control}
                  id='short_name'
                  name='short_name'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='short_name'
                      placeholder='CM EP'
                      invalid={errors.short_name && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='long_name'>
                  Nombre Completo
                </Label>
                <Controller
                  defaultValue={selectedVocEdu.long_name}
                  control={control}
                  id='long_name'
                  name='long_name'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='long_name'
                      placeholder='CM Estética y peluquería'
                      invalid={errors.long_name && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='description'>
                  Descripción
                </Label>
                <Controller
                  defaultValue={selectedVocEdu.description}
                  control={control}
                  id="description"
                  name="description"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="description"
                      id="description"
                      placeholder="Ciclo medio de estética y peluquería"
                      invalid={errors.description && true}
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
                    if (id === "0") {
                      window.location.pathname = '/apps/vocationaleducation/list';
                    }
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

export default VocEduInfoCard
