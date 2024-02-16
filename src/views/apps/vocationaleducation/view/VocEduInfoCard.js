// ** React Imports
import { useState, Fragment } from 'react'
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
  const [cycleOptions, setCycleOptions] = useState(null);

  const getAllVocEdu = () => {
    apiGetAllVocationalEducation()
      .then((response) => {
        console.log(response.data.data);
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

  useEffect(() => {
    getAllVocEdu();
    if (id == "0") {
      setShow(true);
    }
  }, []);

  // ** Hook
  const {
    reset,
    control,
    setError,
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

    if (validateUserData(data)) {
      if (id == "0") {
        dispatch(addVocationalEducation(selectedVocEdu));
        setShow(false);
      } else {
        dispatch(updateVocationalEducation(selectedVocEdu));
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
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info mb-3">
                  <h4>
                    {selectedVocEdu !== null
                      ? selectedVocEdu.short_name.concat(' ' + selectedVocEdu.long_name)
                      : 'Eleanor Aguilar'}
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
                      invalid={errors.name && true}
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
                      invalid={errors.surname && true}
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
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="description"
                      id="description"
                      placeholder="Ciclo medio de estética y peluquería"
                      invalid={errors.email && true}
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

export default VocEduInfoCard
