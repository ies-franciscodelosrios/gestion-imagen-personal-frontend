// ** React Imports
import { Link, Navigate } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/forgot-password-v2.svg'
import illustrationsDark from '@src/assets/images/pages/forgot-password-v2-dark.svg'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

// ** Logo
import logo from '@src/assets/images/logo/pericles.svg';

const ForgotPassword = () => {
  // ** Hooks
  const { skin } = useSkin()

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  if (!isUserLoggedIn()) {
    return (
      <div className='auth-wrapper auth-cover'>
        <Row className='auth-inner m-0'>
          <Link className='brand-logo d-flex align-items-center' to='/' onClick={e => e.preventDefault()}>
            <img src={logo} alt="insertar SVG con la etiqueta image" width="64" height="72"></img>
            <h2 className="brand-text text-primary ms-1 my-0">I.E.S. EL TABLERO</h2>
          </Link>
          <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
              <img className='img-fluid' src={source} alt='Login Cover' />
            </div>
          </Col>
          <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
            <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
              <CardTitle tag='h2' className='fw-bold mb-1'>
                ¿Contraseña Olvidada? 🔐
              </CardTitle>
              <CardText className='mb-2'>
                Introduce tu email y te mandaremos las instrucciones a seguir para resetear la contraseña
              </CardText>
              <Form className='auth-forgot-password-form mt-2' onSubmit={e => e.preventDefault()}>
                <div className='mb-1'>
                  <Label className='form-label' for='login-email'>
                    Email
                  </Label>
                  <Input type='email' id='login-email' placeholder='john@example.com' autoFocus />
                </div>
                <Button color='primary' block>
                  Enviar link de recuperación
                </Button>
              </Form>
              <p className='text-center mt-2'>
                <Link to='/login'>
                  <ChevronLeft className='rotate-rtl me-25' size={14} />
                  <span className='align-middle'>Volver al Inicio Sesión</span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
      </div>
    )
  } else {
    return <Navigate to='/' />
  }
}

export default ForgotPassword
