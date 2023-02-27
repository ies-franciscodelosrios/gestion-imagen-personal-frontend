// ** React Imports
import { Fragment, useState } from 'react';
import classnames from 'classnames'


// ** Icons Imports
import { Home, Settings, EyeOff, User } from 'react-feather';
import {
  Row,
  Col,
  Card,
  CardHeader,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { Controller, useForm } from 'react-hook-form';
const SheetTabs = (selectedClient) => {
  const [data, setData] = useState(null)

  // ** State
  const [active, setActive] = useState('1');
  const SheetsOptions = [
    [
      { value: 'Normal', label: 'Normal' },
      { value: 'Amarillento', label: 'Amarillento' },
      { value: 'Rojizo', label: 'Rojizo' },
      { value: 'Grisáceo', label: 'Grisáceo' },
      { value: 'Aceitunada', label: 'Aceitunada' },
    ],
    [
      { value: 'Normal', label: 'Normal' },
      { value: 'Fina', label: 'Fina' },
      { value: 'Gruesa', label: 'Gruesa' },
    ],
    [
      { value: 'Áspera', label: 'Áspera' },
      { value: 'Suave', label: 'Suave' },
      { value: 'Untuoso', label: 'Untuoso' },
    ],
    [
      { value: 'Normal', label: 'Normal' },
      { value: 'Ocluido', label: 'Ocluido' },
      { value: 'Dilatado', label: 'Dilatado' },
    ],
    [
      { value: 'Normal', label: 'Normal' },
      { value: 'Deshidratada', label: 'Deshidratada' },
      { value: 'Muy hidratada', label: 'Muy hidratada' },
      { value: 'Hiperhidratada', label: 'Hiperhidratada' },
    ],
    [
      { value: 'Normal', label: 'Normal' },
      { value: 'Alípica', label: 'Alípica' },
      { value: 'Seborreica', label: 'Seborreica' },
      { value: 'Mixta', label: 'Mixta' },
    ],
    [
      { value: 'Seborrea', label: 'Seborrea' },
      { value: 'Acné', label: 'Acné' },
      { value: 'Pápulas', label: 'Pápulas' },
      { value: 'Pústulas', label: 'Pústulas' },
      { value: 'Comedones', label: 'Comedones' },
    ],
  ];

  const { handleSubmit, control } = useForm({
    Coloracion: null,
    Grosor_piel: null,
    Tacto: null,
    Brillo_piel: null,
    Aspecto_poro: null,
    Grado_hidratacion: null,
  });

  const onSubmit = data => {
    setData(data)
    if (Object.values(data).every((field) => field !== undefined && field.toString().length > 0)) {
      console.log('newtabs');
      
    }
    console.log(data);
  };

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <Card>
      <CardHeader tag="h4">Fichas</CardHeader>

      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1');
            }}
          >
            <Home size={14} />
            <span className="align-middle">Facial</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2');
            }}
          >
            <Settings size={14} />
            <span className="align-middle">Peluqueria</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '3'}
            onClick={() => {
              toggle('3');
            }}
          >
            <Settings size={14} />
            <span className="align-middle">Capilar</span>
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2')
            }}
          >
            <Settings size={14} />
            <span className='align-middle'>Corporal</span>
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
            <span className='align-middle'>Podal</span>
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent className="py-50 align-middle " activeTab={active}>
        <TabPane tabId="1">
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="Coloracion">
                    Coloración
                  </Label>
                  <Controller
                    control={control}
                    id="Coloracion"
                    name="Coloracion"
                    render={({ field }) => (
                      <CreatableSelect
                        options={SheetsOptions[0]}
                        classNamePrefix="select"
                        className={classnames('react-select', { 'is-invalid': data !== null && data.Coloracion === undefined })}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="Grosor_piel">
                    Grosor de piel
                  </Label>
                  <Controller
                    control={control}
                    id="Grosor_piel"
                    name="Grosor_piel"
                    render={({ field }) => (
                      <CreatableSelect
                        options={SheetsOptions[1]}
                        classNamePrefix="select"
                        className={classnames('react-select', { 'is-invalid': data !== null && data.Grosor_piel === undefined })}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="Tacto">
                    Tacto
                  </Label>
                  <Controller
                    control={control}
                    id="Tacto"
                    name="Tacto"
                    render={({ field }) => (
                      <CreatableSelect
                        options={SheetsOptions[2]}
                        classNamePrefix="select"
                        className={classnames('react-select', { 'is-invalid': data !== null && data.Tacto === undefined })}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="Brillo_piel">
                    Brillo de la piel
                  </Label>
                  <Controller
                    control={control}
                    id="Brillo_piel"
                    name="Brillo_piel"
                    render={({ field }) => (
                      <CreatableSelect
                        options={SheetsOptions[3]}
                        classNamePrefix="select"
                        className={classnames('react-select', { 'is-invalid': data !== null && data.Brillo_piel === undefined })}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="Aspecto_poro">
                    Apecto del poro
                  </Label>
                  <Controller
                    control={control}
                    id="Aspecto_poro"
                    name="Aspecto_poro"
                    render={({ field }) => (
                      <CreatableSelect
                        options={SheetsOptions[4]}
                        classNamePrefix="select"
                        className={classnames('react-select', { 'is-invalid': data !== null && data.Aspecto_poro === undefined })}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="Grado_hidratacion">
                    Grado hidratación
                  </Label>
                  <Controller
                    control={control}
                    id="Grado_hidratacion"
                    name="Grado_hidratacion"
                    render={({ field }) => (
                      <CreatableSelect
                        options={SheetsOptions[5]}
                        classNamePrefix="select"
                        className={classnames('react-select', { 'is-invalid': data !== null && data.Grado_hidratacion === undefined })}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col sm="12">
                  <div className="d-flex">
                    <Button className="me-1" color="primary" type="submit">
                      Guardar
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </TabPane>
        <TabPane tabId="2">
          <CardBody>
            <Form>
              <Row>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="nameMulti">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="nameMulti"
                    placeholder="First Name"
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="lastNameMulti">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    name="lastname"
                    id="lastNameMulti"
                    placeholder="Last Name"
                  />
                </Col>
                <Col sm="12">
                  <div className="d-flex">
                    <Button
                      className="me-1"
                      color="primary"
                      type="submit"
                      onClick={(e) => e.preventDefault()}
                    >
                      Guardar
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </TabPane>
        <TabPane tabId="3">
          <CardBody>
            <Form>
              <Row>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="nameMulti">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="nameMulti"
                    placeholder="First Name"
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="lastNameMulti">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    name="lastname"
                    id="lastNameMulti"
                    placeholder="Last Name"
                  />
                </Col>
                <Col sm="12">
                  <div className="d-flex">
                    <Button
                      className="me-1"
                      color="primary"
                      type="submit"
                      onClick={(e) => e.preventDefault()}
                    >
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
  );
};
export default SheetTabs;
