// ** Icons Imports
import { PhoneCall, Mail,MapPin } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody } from 'reactstrap'

const FaqContact = () => {
  return (
    <div className='faq-contact'>
      <Row className='mt-5 pt-75'>
        <Col className='text-center' sm='12'>
         {/*  <h2>¿Aun tienes preguntas?</h2>
          <p className='mb-3'>
            Si no se ha resuelto con las soluciones del FAQ accede a la documentación de la misma.
          </p> */}
        </Col>
        <Col sm='4'>
          <Card className='text-center faq-contact-card shadow-none py-1'>
            <CardBody>
              <div className='avatar avatar-tag bg-light-primary mb-2 mx-auto'>
                <PhoneCall size={18} />
              </div>
              <h4>957 37 99 45</h4>
              <span className='text-body'>Siempre contentos por ayudarte!</span>
            </CardBody>
          </Card>
        </Col>
      
        <Col sm='4'>
          <Card className='text-center faq-contact-card shadow-none py-1'>
            <CardBody>
              <div className='avatar avatar-tag bg-light-primary mb-2 mx-auto'>
              <a href="mailTo:iestablero@help.com"><Mail size={18} /></a>
              </div>
              <h4>iestablero@help.com</h4>
              <span className='text-body'>La mejor manera de conseguir una rápida respuesta!</span>
            </CardBody>
          </Card>
        </Col> 
         <Col sm='4'>
          <Card className='text-center faq-contact-card shadow-none py-1'>
            <CardBody>
              <div className='avatar avatar-tag bg-light-primary mb-2 mx-auto'>
              <a href="https://goo.gl/maps/6kwjE5LRAabU4PGm7">  <MapPin size={18} /></a>
              </div>
              <h4>Av. de la Arruzafilla, s/n, 14011 Córdoba</h4>
              <span className='text-body'>Visitanos cuando quieras!</span>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default FaqContact
