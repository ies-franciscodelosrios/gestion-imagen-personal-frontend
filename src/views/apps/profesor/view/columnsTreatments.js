// ** React Imports
import { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
  UncontrolledTooltip,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from 'reactstrap';

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Clipboard,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle,
  BookOpen,
  ChevronsRight
} from 'react-feather'
/*const [show, setShow] = useState(false);

const treatmentList = () => {
  // ... lógica de tratamiento
  setShow(false);
}*/


// ** Vars
const invoiceStatusObj = {

  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}


// ** Table columns
export const columns = [
{
    minWidth: '200px',
    name: 'Fecha',
    sortable: true,
    sortField: 'date',
    selector: row => row.date,
    cell: row => row.date
  }, {
    minWidth: '200px',
    name: 'Dni cliente',
    sortable: true,
    sortField: 'dni_client',
    selector: row => row.dni_client,
    cell: row => row.dni_client
  }, {
    minWidth: '200px',
    name: 'Dni estudiante',
    sortable: true,
    sortField: 'dni_Student',
    selector: row => row.dni_student,
    cell: row => row.dni_student
  },
  {
    minWidth: '200px',
    name: 'Tratamiento',
    sortable: true,
    sortField: 'treatment',
    selector: row => row.treatment,
    cell: row => row.treatment
  }, {
    name: "Protocolo",
    minWidth: '200px',
    sortable: true,
    sortField: 'protocol',
    selector: row => row.protocol,
    cell: row => {
      const color = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].color : 'primary',
        Icon = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].icon : Clipboard
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
          <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
            <br />
            {row.Consultancy}
          </UncontrolledTooltip>
        </Fragment>
      )
    }
  },


  {
    name: "Consultas",
    minWidth: '200px',
    sortable: true,
    sortField: 'consultancy',
    selector: row => row.consultancy,
    cell: row => {
      return (
        <Fragment>
          <Button color="primary"  >
            {row.consultancy[1]}
          </Button>
        
        </Fragment>
      )
    }
  }
]
//  export default treatmentList
/*

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
                      defaultValue={{ label: selectedUser.cycle, value: selectedUser.cycle }} // Set the default value to the first option in the array
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

*/