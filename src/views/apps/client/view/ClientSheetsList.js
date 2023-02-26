// ** Reactstrap Imports
import { Card, CardHeader, Progress, Row, Col, Form, CardBody, CardTitle, Button, Input, Label } from 'reactstrap'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'



const ClientSheetsList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Antecedentes de Salud</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                Alergias
              </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='First Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Patologías
              </Label>
              <Input type='text' name='lastname' id='lastNameMulti' placeholder='Last Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                Intervenciones Quirúrgicas
              </Label>
              <Input type='text' name='city' id='cityMulti' placeholder='City' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
                Medicamento
              </Label>
              <Input type='text' name='country' id='CountryMulti' placeholder='Country' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Prótesis
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Otros
              </Label>
              <Input type='email' name='Email' id='EmailMulti' placeholder='Email' />
            </Col>
          </Row>


      <CardHeader>
        <CardTitle tag='h4'>Hábitos de Vida</CardTitle>
      </CardHeader>

          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                Fuma
                </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='First Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                Frecuencia
                </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='First Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Bebe(alcohol)
              </Label>
              <Input type='text' name='lastname' id='lastNameMulti' placeholder='Last Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                Frecuencia
                </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='First Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
              Bebe(agua)
              </Label>
              <Input type='text' name='city' id='cityMulti' placeholder='City' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                Frecuencia
                </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='First Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
                Deporte
              </Label>
              <Input type='text' name='country' id='CountryMulti' placeholder='Country' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                Frecuencia
                </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='First Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Tipo de Vida
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Tolerancia Solar
              </Label>
              <Input type='email' name='Email' id='EmailMulti' placeholder='Email' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
              Cicatricación              
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
              Alimentación              
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
            </Col>
          </Row>


      <CardHeader>
        <CardTitle tag='h4'>Antecedentes Estéticos</CardTitle>
      </CardHeader>

          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                Tratamientos anteriores y resultado obtenido:
              </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='First Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
              Problema actual:
              </Label>
              <Input type='text' name='lastname' id='lastNameMulti' placeholder='Last Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
              Desde cuando:
              </Label>
              <Input type='text' name='city' id='cityMulti' placeholder='City' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              Con qué lo relaciona:
              </Label>
              <Input type='text' name='country' id='CountryMulti' placeholder='Country' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
              Cosméticos que utiliza:
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
              Otros:
              </Label>
              <Input type='email' name='Email' id='EmailMulti' placeholder='Email' />
            </Col>
            <Col sm='12'>
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                  Guardar
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

export default ClientSheetsList
