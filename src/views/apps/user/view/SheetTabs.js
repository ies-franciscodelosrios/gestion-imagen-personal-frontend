// ** React Imports
import { Fragment, useState } from 'react'

// ** Icons Imports
import { Home, Settings, EyeOff, User } from 'react-feather'
import { Row, Col, Card,CardHeader, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'
// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
const SheetTabs = () => {
  // ** State
  const [active, setActive] = useState('1')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  return (
    <Card>
      <CardHeader tag='h4'>Fichas</CardHeader>


      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1')
            }}
          >
            <Home size={14} />
            <span className='align-middle'>Peluquería</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2')
            }}
          >
            <Settings size={14} />
            <span className='align-middle'>Estética</span>
          </NavLink>
        </NavItem>

      </Nav>
      <TabContent className='py-50 align-middle ' activeTab={active}>
        <TabPane tabId='1'>
        <CardBody>
        <Form>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                First Name
              </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='First Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Last Name
              </Label>
              <Input type='text' name='lastname' id='lastNameMulti' placeholder='Last Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                City
              </Label>
              <Input type='text' name='city' id='cityMulti' placeholder='City' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
                Country
              </Label>
              <Input type='text' name='country' id='CountryMulti' placeholder='Country' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Company
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Email
              </Label>
              <Input type='email' name='Email' id='EmailMulti' placeholder='Email' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Company
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Company
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Company
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
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
        </TabPane>
        <TabPane tabId='2'>
        <CardBody>
        <Form>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                First Name
              </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='First Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Last Name
              </Label>
              <Input type='text' name='lastname' id='lastNameMulti' placeholder='Last Name' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                City
              </Label>
              <Input type='text' name='city' id='cityMulti' placeholder='City' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
                Country
              </Label>
              <Input type='text' name='country' id='CountryMulti' placeholder='Country' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Company
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Email
              </Label>
              <Input type='email' name='Email' id='EmailMulti' placeholder='Email' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Company
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Company
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Company
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Company' />
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
        </TabPane>

      </TabContent>

    </Card>
  )
}
export default SheetTabs
