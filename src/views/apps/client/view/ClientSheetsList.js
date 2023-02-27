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
              <Label className='form-label' for='Alergias'>
                Alergias
              </Label>
              <Input type='text' name='Alergias' id='Alergias' placeholder='Alergias' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Patologías'>
                Patologías
              </Label>
              <Input type='text' name='Patologías' id='Patologías' placeholder='Patologías' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Intervenciones'>
                Intervenciones Quirúrgicas
              </Label>
              <Input type='text' name='Intervenciones' id='Intervenciones' placeholder='Intervenciones' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Medicamento'>
                Medicamento
              </Label>
              <Input type='text' name='Medicamento' id='Medicamento' placeholder='Medicamentos' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Prótesis'>
                Prótesis
              </Label>
              <Input type='text' name='Prótesis' id='Prótesis' placeholder='Prótesis' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Otros_antecedentes'>
                Otros
              </Label>
              <Input name='Otros_antecedentes' id='Otros_antecedentes' placeholder='Otros' />
            </Col>
          </Row>


      <CardHeader>
        <CardTitle tag='h4'>Hábitos de Vida</CardTitle>
      </CardHeader>

          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Fuma'>
                Fuma
                </Label>
              <Input type='text' name='Fuma' id='Fuma' placeholder='Fumador' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Frecuencia_fuma'>
                Frecuencia
                </Label>
              <Input type='text' name='Frecuencia_fuma' id='Frecuencia_fuma' placeholder='Muy Frecuente' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='alcohol'>
                Bebe(alcohol)
              </Label>
              <Input type='text' name='alcohol' id='alcohol' placeholder='Bebedor' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Frecuencia_alcohol'>
                Frecuencia
                </Label>
              <Input type='text' name='Frecuencia_alcohol' id='Frecuencia_alcohol' placeholder='Frecuente' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='agua'>
              Bebe(agua)
              </Label>
              <Input type='text' name='agua' id='agua' placeholder='Bebedor' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Frecuencia_agua'>
                Frecuencia
                </Label>
              <Input type='text' name='Frecuencia_agua' id='Frecuencia_agua' placeholder='Muy Frecuente' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='deporte'>
                Deporte
              </Label>
              <Input type='text' name='deporte' id='deporte' placeholder='Deportista' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Frecuencia_deporte'>
                Frecuencia
                </Label>
              <Input type='text' name='Frecuencia_deporte' id='Frecuencia_deporte' placeholder='Frecuente' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='tipo_vida'>
                Tipo de Vida
              </Label>
              <Input type='text' name='tipo_vida' id='tipo_vida' placeholder='Sedentario' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='tolerancia_solar'>
                Tolerancia Solar
              </Label>
              <Input type='text' name='tolerancia_solar' id='tolerancia_solar' placeholder='Tolerable' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Cicatricación'>
              Cicatricación              
              </Label>
              <Input type='text' name='Cicatricación' id='Cicatricación' placeholder='Cicatrización' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Alimentacion'>
              Alimentación              
              </Label>
              <Input type='text' name='Alimentacion' id='Alimentacion' placeholder='Saludable' />
            </Col>
          </Row>


      <CardHeader>
        <CardTitle tag='h4'>Antecedentes Estéticos</CardTitle>
      </CardHeader>

          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='tratamientos'>
                Tratamientos anteriores y resultado obtenido:
              </Label>
              <Input type='text' name='tratamientos' id='tratamientos' placeholder='Ultimos tratamientos' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Problema'>
              Problema actual:
              </Label>
              <Input type='text' name='Problema' id='Problema' placeholder='Problema actual' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Problema_tiempo'>
              Desde cuando:
              </Label>
              <Input type='text' name='Problema_tiempo' id='Problema_tiempo' placeholder='Tiempo desde el problema' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Problema_relacion'>
              Con qué lo relaciona:
              </Label>
              <Input type='text' name='Problema_relacion' id='Problema_relacion' placeholder='Relación' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Cosmeticos'>
              Cosméticos que utiliza:
              </Label>
              <Input type='text' name='Cosmeticos' id='Cosmeticos' placeholder='Cometicos' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='Otros_esteticos'>
              Otros:
              </Label>
              <Input type='text' name='Otros_esteticos' id='Otros_esteticos' placeholder='Otros...' />
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
