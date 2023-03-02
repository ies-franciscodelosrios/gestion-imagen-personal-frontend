// ** React Imports
import { Fragment, useState } from 'react';
import classnames from 'classnames';

import { selectThemeColors } from '@utils';

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
  CardTitle,
} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateClient } from '../store';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
const SheetTabs = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.clients);

  const [datatab1, setDatatab1] = useState(
    store.selectedClient.Life_Style.length > 20
      ? JSON.parse(store.selectedClient.Life_Style)
      : {}
  );
  const [datatab2, setDatatab2] = useState(
    store.selectedClient.Background_Health.length > 20
      ? JSON.parse(store.selectedClient.Background_Health)
      : {}
  );

  // ** State
  const [active, setActive] = useState('1');


  const facial_fields = {
        1: {
      Coloracion: {label:'Coloracion', identifier:'Coloracion'},
      Grosor_piel: {label:'Grosor piel', identifier:'Grosor_piel'},
      Tacto: {label:'Tacto', identifier:'Tacto'},
      Brillo_piel: {label:'Brillo piel', identifier:'Brillo_piel'},
      Aspecto_poro: {label:'Aspecto poro', identifier:'Aspecto_poro'},
      Grado_hidratacion: {label:'Grado hidratacion', identifier:'Grado_hidratacion'},
      Secreciones_sebaceas: {label:'Secreciones sebaceas', identifier:'Secreciones_sebaceas'},
      Alteraciones_secrecion: {label:'Alteraciones secrecion', identifier:'Alteraciones_secrecion'},
      Alteracion_pigmento: {label:'Alteracion pigmento', identifier:'Alteracion_pigmento'},
      Alteracion_vacular: {label:'Alteracion vacular', identifier:'Alteracion_vacular'},
      Alteracion_vello: {label:'Alteracion vello', identifier:'Alteracion_vello'},
      Tono_muscular: {label:'Tono muscular', identifier:'Tono_muscular'},
      Descamacion: {label:'Descamacion', identifier:'Descamacion'},
      Arrugas: {label:'Arrugas', identifier:'Arrugas'},
      Flacidez: {label:'Flacidez', identifier:'Flacidez'},
      Bosas_palpebrales: {label:'Bosas palpebrales', identifier:'Bosas_palpebrales'},
      Otras_alteraciones: {label:'Otras alteraciones', identifier:'Otras_alteraciones'},
  },
  2: {
      Lupa: {label:'Lupa', identifier:'Lupa'}, 
      Medidor_de_hidratacion: {label:'Medidor de hidratacion', identifier:'Medidor_de_hidratacion'}, 
      Luz_de_Wood: {label:'Luz de Wood', identifier:'Luz_de_Wood'}, 
      Otros_medios: {label:'Otros medios', identifier:'Otros_medios'}},
  3: {
    Tipo: {label:'Tipo', identifier:'Tipo'}, 
    Alteraciones: {label:'Alteraciones', identifier:'Alteraciones'}},
  };
  var facial_options = {
    1: [
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
        { value: 'Brillo', label: 'Brillo' },
        { value: 'Mate', label: 'Mate' },
        { value: 'Marchito', label: 'Marchito' },
        { value: 'Satinado', label: 'Satinado' },
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
      [
        { value: 'Cloastomas', label: 'Cloastomas' },
        { value: 'Nevus', label: 'Nevus' },
        { value: 'Efélides', label: 'Efélides' },
        { value: 'Lentigo', label: 'Lentigo' },
        { value: 'Vitíligo/Albinismo', label: 'Vitíligo/Albinismo' },
      ],
      [
        { value: 'Eritosis', label: 'Eritosis' },
        { value: 'Telangiectasia', label: 'Telangiectasia' },
        { value: 'Rosáceo', label: 'Rosáceo' },
        { value: 'Eritema', label: 'Eritema' },
        { value: 'Cuperosis', label: 'Cuperosis' },
      ],
      [
        { value: 'Hipertricosis', label: 'Hipertricosis' },
        { value: 'Hirsutismo', label: 'Hirsutismo' },
      ],
      [
        { value: 'Bueno', label: 'Bueno' },
        { value: 'Medio', label: 'Medio' },
        { value: 'Pobre', label: 'Pobre' },
      ],
      [
        { value: 'Alta', label: 'Alta' },
        { value: 'Media', label: 'Media' },
        { value: 'Baja', label: 'Baja' },
        { value: 'Nula', label: 'Nula' },
      ],
      [
        { value: 'Escote', label: 'Escote' },
        { value: 'Frente', label: 'Frente' },
        { value: 'Orbicular labios', label: 'Orbicular labios' },
        { value: 'Orbicular de ojos', label: 'Orbicular de ojos' },
      ],
      [
        { value: 'Párpados', label: 'Párpados' },
        { value: 'Mentón', label: 'Mentón' },
        { value: 'Óvalo', label: 'Óvalo' },
        { value: 'Mejillas', label: 'Mejillas' },
      ],
      [
        { value: 'Edema', label: 'Edema' },
        { value: 'Grasa', label: 'Grasa' },
      ],
      [
        { value: 'Psoriasis', label: 'Psoriasis' },
        { value: 'Milium', label: 'Milium' },
        { value: 'Hiperqueratosis', label: 'Hiperqueratosis' },
        { value: 'Picor/sudoración', label: 'Picor/sudoración' },
      ],
    ],
    2: [
      [],
      [
        { value: 'Deshidratada', label: 'Deshidratada' },
        { value: 'Normal', label: 'Normal' },
        { value: 'Hidratada', label: 'Hidratada' },
        { value: 'Muy Hidratada', label: 'Muy Hidratada' },
      ],
      [
        { value: 'Blanca', label: 'Blanca' },
        { value: 'Oscura', label: 'Oscura' },
        { value: 'Violeta intenso', label: 'Violeta intenso' },
        { value: 'Rosada', label: 'Rosada' },
        { value: 'Naranja', label: 'Naranja' },
        { value: 'Violácea', label: 'Violácea' },
        { value: 'Puntos Blancos', label: 'Puntos Blancos' },
      ],
      [],
    ],
    3: [' ', ' '],
  };

  const capilar_fields = {
    1: {
  t2Coloracion: {label:'Coloracion', identifier:'t2Coloracion'},
  t2Tacto: {label:'Tacto', identifier:'t2Tacto'},
  t2Brillo_piel: {label:'Brillo piel', identifier:'t2Brillo_piel'},
  t2Grado_hidratacion: {label:'Grado hidratacion', identifier:'t2Grado_hidratacion'},
  t2Secreciones_sebaceas: {label:'Secreciones sebaceas', identifier:'t2Secreciones_sebaceas'},
  t2Alteracion_vacular: {label:'Alteracion vacular', identifier:'t2Alteracion_vacular'},
  t2Alteracion_Tallo_Capilar: {label:'Alteracion Tallo Capilar', identifier:'t2Alteracion_Tallo_Capilar'},
  t2Descamacion: {label:'Descamacion', identifier:'t2Descamacion'},
  t2Otras_alteraciones: {label:'Otras alteraciones', identifier:'t2Otras_alteraciones'},
 }
// 2: {
//   Lupa: {label:'Lupa', identifier:'Lupa'}, 
//   Medidor_de_hidratacion: {label:'Medidor de hidratacion', identifier:'Medidor_de_hidratacion'}, 
//   Luz_de_Wood: {label:'Luz de Wood', identifier:'Luz_de_Wood'}, 
//   Otros_medios: {label:'Otros medios', identifier:'Otros_medios'}},
// 3: {
// Tipo: {label:'Tipo', identifier:'Tipo'}, 
// Alteraciones: {label:'Alteraciones', identifier:'Alteraciones'}},
};
  var capilar_options = {
    1: [
      [
        { value: 'Normal', label: 'Normal' },
        { value: 'Amarillento', label: 'Amarillento' },
        { value: 'Rojizo', label: 'Rojizo' },
        { value: 'Grisáceo', label: 'Grisáceo' },
        { value: 'Aceitunada', label: 'Aceitunada' },
      ],
      [
        { value: 'Áspera', label: 'Áspera' },
        { value: 'Suave', label: 'Suave' },
        { value: 'Untuoso', label: 'Untuoso' },
      ],
      [
        { value: 'Brillo', label: 'Brillo' },
        { value: 'Mate', label: 'Mate' },
        { value: 'Marchito', label: 'Marchito' },
        { value: 'Satinado', label: 'Satinado' },
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
      ],
      [
        { value: 'Hiperemia', label: 'Hiperemia' },
      ],
      [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' },
      ],
      [
        { value: 'Alta', label: 'Alta' },
        { value: 'Media', label: 'Media' },
        { value: 'Baja', label: 'Baja' },
        { value: 'Nula', label: 'Nula' },
      ],
      [ ],
      [
        { value: 'Párpados', label: 'Párpados' },
        { value: 'Mentón', label: 'Mentón' },
        { value: 'Óvalo', label: 'Óvalo' },
        { value: 'Mejillas', label: 'Mejillas' },
      ],
      [
        { value: 'Edema', label: 'Edema' },
        { value: 'Grasa', label: 'Grasa' },
      ],
      [
        { value: 'Psoriasis', label: 'Psoriasis' },
        { value: 'Milium', label: 'Milium' },
        { value: 'Hiperqueratosis', label: 'Hiperqueratosis' },
        { value: 'Picor/sudoración', label: 'Picor/sudoración' },
      ],
    ],

  };


  const { reset, handleSubmit, control } = useForm(facial_fields);

  /**
   * Funcitions that excute the save button
   * @param {*} data to save into client
   */
  const onSubmittab1 = async (data) => {
    const updatedClient = { ...store.selectedClient };
    await setDatatab1(data);

    updatedClient.Life_Style = JSON.stringify(data);
    dispatch(updateClient(updatedClient));
  };
   const onSubmittab2 = async (data) => {
    const updatedClient = { ...store.selectedClient };
    await setDatatab2(data);

    updatedClient.Life_Style = JSON.stringify(data);
    dispatch(updateClient(updatedClient));
  };

  /**
   * Funcition to change between tabs.
   * @param {*} tab which is clicked
   */
  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
    handleReset();
  };
  const handleReset = () => {
    reset({
      Coloracion: datatab1['Coloracion'] || '',
      Grosor_piel: datatab1['Grosor_piel'] || '',
      Tacto: datatab1['Tacto'] || '',
      Brillo_piel: datatab1['Brillo_piel'] || '',
      Aspecto_poro: datatab1['Aspecto_poro'] || '',
      Grado_hidratacion: datatab1['Grado_hidratacion'] || '',
      Secreciones_sebaceas: datatab1['Secreciones_sebaceas'] || '',
      Alteraciones_secrecion: datatab1['Alteraciones_secrecion'] || '',
      Alteracion_pigmento: datatab1['Alteracion_pigmento'] || '',
      Alteracion_vacular: datatab1['Alteracion_vacular'] || '',
      Alteracion_vello: datatab1['Alteracion_vello'] || '',
      Tono_muscular: datatab1['Tono_muscular'] || '',
      Descamacion: datatab1['Descamacion'] || '',
      Arrugas: datatab1['Arrugas'] || '',
      Flacidez: datatab1['Flacidez'] || '',
      Bosas_palpebrales: datatab1['Bosas_palpebrales'] || '',
      Otras_alteraciones: datatab1['Otras_alteraciones'] || '',
      Lupa: datatab1['Lupa'] || '',
      Medidor_de_hidratacion: datatab1['Medidor_de_hidratacion'] || '',
      Luz_de_Wood: datatab1['Luz_de_Wood'] || '',
      Otros_medios: datatab1['Otros_medios'] || '',
      Tipo: datatab1['Tipo'] || '',
      Alteraciones: datatab1['Alteraciones'] || '',
    });
  };

  // ** Get data on mount
  useEffect(() => {
    try {
      setDatatab1(JSON.parse(store.selectedClient.Life_Style));
    } catch (error) {
      setDatatab1({});
    }
    handleReset();
  }, [dispatch, store.selectedClient]);

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
            <span className="align-middle">Capilar</span>
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
      </Nav>
      <TabContent className="py-50 align-middle " activeTab={active}>
        <TabPane tabId="1">
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmittab1)}>
              <Row>
                <CardHeader>
                  <CardTitle tag="h4">Observación,Tacto y Palpación</CardTitle>
                </CardHeader>
                {Object.values(facial_fields[1]).map((dato, index) => {
                  return (
                    <Col md="6" sm="12" className="mb-1" key={dato.identifier}>
                      <Label className="form-label" for={dato.identifier}>
                        {dato.label}
                      </Label>
                      <Controller
                        control={control}
                        id={dato.identifier}
                        name={dato.identifier}
                        render={({ field }) => (
                          <CreatableSelect
                            noOptionsMessage={() => 'Nada Disponible'}
                            placeholder="Selecciona..."
                            formatCreateLabel={(inputText) =>
                              `Crear"${inputText}"`
                            }
                            theme={selectThemeColors}
                            isMulti="true"
                            options={facial_options[1][index]}
                            defaultValue={
                              datatab1 !== null ? datatab1[dato.identifier] : ''
                            }
                            classNamePrefix="select"
                            className="react-select"
                            {...field}
                          />
                        )}
                      />
                    </Col>
                  );
                })}
                <CardHeader>
                  <CardTitle tag="h4">Exploración con Aparatología</CardTitle>
                </CardHeader>
                {Object.values(facial_fields[2]).map((dato, index) => {
                  return (
                    <Col md="6" sm="12" className="mb-1" key={dato.identifier}>
                      <Label className="form-label" for={dato.identifier}>
                        {dato.label}
                      </Label>
                      <Controller
                        control={control}
                        id={dato.identifier}
                        name={dato.identifier}
                        render={({ field }) => (
                          <CreatableSelect
                            noOptionsMessage={() => 'Nada Disponible'}
                            placeholder="Selecciona..."
                            formatCreateLabel={(inputText) =>
                              `Crear"${inputText}"`
                            }
                            theme={selectThemeColors}
                            isMulti="true"
                            options={facial_options[2][index]}
                            defaultValue={
                              datatab1 !== null ? datatab1[dato.identifier] : ''
                            }
                            classNamePrefix="select"
                            className="react-select"
                            {...field}
                          />
                        )}
                      />
                    </Col>
                  );
                })}
                <CardHeader>
                  <CardTitle tag="h4">Diagnostico de Cutis</CardTitle>
                </CardHeader>
                {Object.values(facial_fields[3]).map((dato, index) => {
                  return (
                    <Col md="6" sm="12" className="mb-1" key={dato.identifier}>
                      <Label className="form-label" for={dato.identifier}>
                        {dato.label}
                      </Label>
                      <Controller
                        control={control}
                        id={dato.identifier}
                        name={dato.identifier}
                        defaultValue={facial_options[3][index]}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            placeholder="Cosmeticos usados"
                          />
                        )}
                      />
                    </Col>
                  );
                })}
                <Col sm="12">
                  <div className="d-flex">
                    <Button className="me-1" color="primary" type="submit" onClick={()=> toast.success('Correctamente Guardado!')}>
                      Guardar
                    </Button>
                    <Button
                      className="me-1"
                      color="secondary"
                      onClick={async() => {
                        handleReset();
                        toast.error('Borrado de datos no guardados')
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </TabPane>
        <TabPane tabId="2">
          <CardBody>
          <Form onSubmit={handleSubmit(onSubmittab2)}>
              <Row>
              <CardHeader>
                  <CardTitle tag="h4">Observación,Tacto y Palpación</CardTitle>
                </CardHeader>
                {Object.values(capilar_fields[1]).map((data, index) => {
                  return (
                    <Col md="6" sm="12" className="mb-1" key={data.identifier}>
                      <Label className="form-label" for={data.identifier}>
                        {data.label}
                      </Label>
                      <Controller
                        control={control}
                        id={data.identifier}
                        name={data.identifier}
                        render={({ field }) => (
                          <CreatableSelect
                            noOptionsMessage={() => 'Nada Disponible'}
                            placeholder="Selecciona..."
                            formatCreateLabel={(inputText) =>
                              `Crear"${inputText}"`
                            }
                            theme={selectThemeColors}
                            isMulti="true"
                            options={capilar_options[1][index]}
                            defaultValue={
                              datatab1 !== null ? datatab1[data.identifier] : ''
                            }
                            classNamePrefix="select"
                            className="react-select"
                            {...field}
                          />
                        )}
                      />
                    </Col>
                  );
                })}
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
                  <Label className="form-label" for="nameMultid">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="nameMultid"
                    placeholder="First Name"
                  />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="lastNameMultif">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    name="lastname"
                    id="lastNameMultif"
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
