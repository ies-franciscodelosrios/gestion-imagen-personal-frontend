// ** React Imports
import { useState } from 'react';

import { selectThemeColors } from '@utils';

// ** Icons Imports
import { Trello } from 'react-feather';
import {
  Row,
  Col,
  Card,
  CardHeader,
  Form,
  CardBody,
  Button,
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
import { useDispatch } from 'react-redux';
import { updateClient } from '../store';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { updateClientBy } from '../../../../services/api';

const SheetTabs = ({ entity, setEntity }) => {
  // ** Store Vars
  const dispatch = useDispatch();

  const [datatab1, setDatatab1] = useState(
    entity.life_style && entity.life_style.length > 20
      ? JSON.parse(entity.life_style)
      : {}
  );



  // ** State
  const [active, setActive] = useState('1');


  const facial_fields = {
    1: {
      Coloracion: { label: 'Coloracion', identifier: 'Coloracion' },
      Grosor_piel: { label: 'Grosor piel', identifier: 'Grosor_piel' },
      Tacto: { label: 'Tacto', identifier: 'Tacto' },
      Brillo_piel: { label: 'Brillo piel', identifier: 'Brillo_piel' },
      Aspecto_poro: { label: 'Aspecto poro', identifier: 'Aspecto_poro' },
      Grado_hidratacion: { label: 'Grado hidratacion', identifier: 'Grado_hidratacion' },
      Secreciones_sebaceas: { label: 'Secreciones sebaceas', identifier: 'Secreciones_sebaceas' },
      Alteraciones_secrecion: { label: 'Alteraciones secrecion', identifier: 'Alteraciones_secrecion' },
      Alteracion_pigmento: { label: 'Alteracion pigmento', identifier: 'Alteracion_pigmento' },
      Alteracion_vacular: { label: 'Alteracion vacular', identifier: 'Alteracion_vacular' },
      Alteracion_vello: { label: 'Alteracion vello', identifier: 'Alteracion_vello' },
      Tono_muscular: { label: 'Tono muscular', identifier: 'Tono_muscular' },
      Descamacion: { label: 'Descamacion', identifier: 'Descamacion' },
      Arrugas: { label: 'Arrugas', identifier: 'Arrugas' },
      Flacidez: { label: 'Flacidez', identifier: 'Flacidez' },
      Bosas_palpebrales: { label: 'Bosas palpebrales', identifier: 'Bosas_palpebrales' },
      Otras_alteraciones: { label: 'Otras alteraciones', identifier: 'Otras_alteraciones' },
    },
    2: {
      Lupa: { label: 'Lupa', identifier: 'Lupa' },
      Medidor_de_hidratacion: { label: 'Medidor de hidratacion', identifier: 'Medidor_de_hidratacion' },
      Luz_de_Wood: { label: 'Luz de Wood', identifier: 'Luz_de_Wood' },
      Otros_medios: { label: 'Otros medios', identifier: 'Otros_medios' }
    },
    3: {
      Tipo: { label: 'Tipo', identifier: 'Tipo' },
      Alteraciones: { label: 'Alteraciones', identifier: 'Alteraciones' }
    },
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
      t2Coloracion: { label: 'Coloracion', identifier: 't2Coloracion' },
      t2Tacto: { label: 'Tacto', identifier: 't2Tacto' },
      t2Brillo_piel: { label: 'Brillo piel', identifier: 't2Brillo_piel' },
      t2Grado_hidratacion: { label: 'Grado hidratacion', identifier: 't2Grado_hidratacion' },
      t2Secreciones_sebaceas: { label: 'Secreciones sebaceas', identifier: 't2Secreciones_sebaceas' },
      t2Alteracion_vacular: { label: 'Alteracion vacular', identifier: 't2Alteracion_vacular' },
      t2Alteracion_Tallo_Capilar: { label: 'Alteracion Tallo Capilar', identifier: 't2Alteracion_Tallo_Capilar' },
      t2Descamacion: { label: 'Descamacion', identifier: 't2Descamacion' },
      t2Otras_alteraciones: { label: 'Otras alteraciones', identifier: 't2Otras_alteraciones' },
    },
    2: {
      t2Microcamara: { label: 'Microcámara', identifier: 't2Microcamara' },
      t2Otros_medios: { label: 'Otros medios', identifier: 't2Otros_medios' }
    },
    3: {
      t2Frecuencia_lavado: { label: 'Frecuencia de lavado', identifier: 't2Frecuencia_lavado' },
      t2Comsmeticos_habituales: { label: 'Cosméticos habituales', identifier: 't2Comsmeticos_habituales' },
      t2Frecuencia_secador: { label: 'Frecuencia de secador', identifier: 't2Frecuencia_secador' },
      t2Frecuencia_plancha: { label: 'Frecuencia de plancha', identifier: 't2Frecuencia_plancha' },
      t2Uso_utensilios_peluqueria: { label: 'Uso de otros utensilios de peluqueria', identifier: 't2Uso_utensilios_peluqueria' },
      t2Frecuencia_asis_peluqueria: { label: 'Frecuencia asistencia peluqueria', identifier: 't2Frecuencia_asis_peluqueria' },
      t2Servicios_peluqueria: { label: 'Servicios peluqueria realizados', identifier: 't2Servicios_peluqueria' },
    },
    4: {
      t2Tipo: { label: 'Tipo', identifier: 't2Tipo' },
      t2Alteraciones: { label: 'Alteraciones', identifier: 't2Alteraciones' }
    },
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
      [],
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
    2: ['', ''],
    3: [
      [
        { value: 'Diario', label: 'Diario' },
        { value: 'Cada dos días', label: 'Cada dos días' },
        { value: 'Más', label: 'Más' },
      ], [
        { value: 'Champú', label: 'Champú' },
        { value: 'Mascarilla', label: 'Mascarilla' },
        { value: 'Acomdicionador', label: 'Acomdicionador' },
      ], [
        { value: 'Diario', label: 'Diario' },
        { value: 'Cada dos días', label: 'Cada dos días' },
        { value: 'Más', label: 'Más' },
      ], [
        { value: 'Diario', label: 'Diario' },
        { value: 'Cada dos días', label: 'Cada dos días' },
        { value: 'Más', label: 'Más' },
      ], [], [
        { value: 'Semanal', label: 'Semanal' },
        { value: 'Mensual', label: 'Mensual' },
        { value: 'Más', label: 'Más' },
      ], [
        { value: 'Coloración', label: 'Coloración' },
        { value: 'Permanente', label: 'Permanente' },
      ]
    ],
    4: ['', '']
  };

  const color_fields = {
    1: {
      t3Cabello: { label: 'Cabello', identifier: 't3Cabello' },
      t3Altura_Tono: { label: 'Altura de tono', identifier: 't3Altura_Tono' },
      t3Reflejo: { label: ' Reflejo', identifier: 't3Reflejo' },
      t3Intensidad: { label: 'Intensidad', identifier: 't3Intensidad' },
      t3Porcetaje_canas: { label: 'Porcentaje de canas', identifier: 't3Porcetaje_canas' },
      t3Color_deseado: { label: ' Color deseado', identifier: 't3Color_deseado' },
      t3Formula: { label: 'Formula', identifier: 't3Formula' },
    }
  };
  var color_options = {
    1: [
      [
        { value: 'Graso', label: 'Graso' },
        { value: 'Seco', label: 'Seco' },
        { value: 'Normal', label: 'Normal' },
        { value: 'Grueso', label: 'Grueso' },
        { value: 'Fino', label: 'Fino' },
        { value: 'Poroso', label: 'Poroso' },
        { value: 'No Poroso', label: 'No Poroso' },
      ], [], [], [], [], [], []
    ]
  };

  const { reset, handleSubmit, control } = useForm(facial_fields);

  /**
   * Funcitions that excute the save button
   * @param {*} data to save into client
   */
  const onSubmit = async (data) => {
    entity.life_style = JSON.stringify(data);
    await updateClientBy({ ...entity }).then(e => { setEntity(e.data); toast.success('Datos guardados') }).catch(e => { toast.error('Error al guardar') });
    await setDatatab1(data);
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
    if (datatab1 !== null) {
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
        // TAB 2
        t2Coloracion: datatab1['t2Coloracion'] || '',
        t2Tacto: datatab1['t2Tacto'] || '',
        t2Brillo_piel: datatab1['t2Brillo_piel'] || '',
        t2Grado_hidratacion: datatab1['t2Grado_hidratacion'] || '',
        t2Secreciones_sebaceas: datatab1['t2Secreciones_sebaceas'] || '',
        t2Alteracion_vacular: datatab1['t2Alteracion_vacular'] || '',
        t2Alteracion_Tallo_Capilar: datatab1['t2Alteracion_Tallo_Capilar'] || '',
        t2Descamacion: datatab1['t2Descamacion'] || '',
        t2Otras_alteraciones: datatab1['t2Otras_alteraciones'] || '',
        t2Microcamara: datatab1['t2Microcamara'] || '',
        t2Otros_medios: datatab1['t2Otros_medios'] || '',
        t2Frecuencia_lavado: datatab1['t2Frecuencia_lavado'] || '',
        t2Comsmeticos_habituales: datatab1['t2Comsmeticos_habituales'] || '',
        t2Frecuencia_secador: datatab1['t2Frecuencia_secador'] || '',
        t2Frecuencia_plancha: datatab1['t2Frecuencia_plancha'] || '',
        t2Uso_utensilios_peluqueria: datatab1['t2Uso_utensilios_peluqueria'] || '',
        t2Frecuencia_asis_peluqueria: datatab1['t2Frecuencia_asis_peluqueria'] || '',
        t2Servicios_peluqueria: datatab1['t2Servicios_peluqueria'] || '',
        t2Tipo: datatab1['t2Tipo'] || '',
        t2Alteraciones: datatab1['t2Alteraciones'] || '',
        //TAB 3
        t3Altura_Tono: datatab1['t3Altura_Tono'] || '',
        t3Reflejo: datatab1['t3Reflejo'] || '',
        t3Intensidad: datatab1['t3Intensidad'] || '',
        t3Porcetaje_canas: datatab1['t3Porcetaje_canas'] || '',
        t3Color_deseado: datatab1['t3Color_deseado'] || '',
        t3Formula: datatab1['t3Formula'] || '',
        t3Cabello: datatab1['t3Cabello'] || '',
      });
    }
  };

  // ** Get data on mount
  useEffect(() => {
    try {
      setDatatab1(JSON.parse(entity.life_style));
    } catch (error) {
      setDatatab1({});
    }
    handleReset();
  }, [dispatch, entity]);

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
            <Trello size={14} />
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
            <Trello size={14} />
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
            <Trello size={14} />
            <span className="align-middle">Coloración</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50 align-middle " activeTab={active}>
        <TabPane tabId="1">
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                            type="textarea"
                            placeholder="Escribe..."
                          />
                        )}
                      />
                    </Col>
                  );
                })}
                <Col sm="12">
                  <div className="d-flex">
                    <Button className="me-1" color="primary" type="submit" >
                      Guardar
                    </Button>
                    <Button
                      className="me-1"
                      color="secondary"
                      onClick={async () => {
                        handleReset();
                        toast.error('Datos no guardados')
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
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                <CardHeader>
                  <CardTitle tag="h4">Exploración con Aparatologia</CardTitle>
                </CardHeader>
                {Object.values(capilar_fields[2]).map((dato, index) => {
                  return (
                    <Col md="6" sm="12" className="mb-1" key={dato.identifier}>
                      <Label className="form-label" for={dato.identifier}>
                        {dato.label}
                      </Label>
                      <Controller
                        control={control}
                        id={dato.identifier}
                        name={dato.identifier}
                        defaultValue={capilar_options[2][index]}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="textarea"
                            placeholder='Escribe...'
                          />
                        )}
                      />
                    </Col>
                  );
                })}
                <CardHeader>
                  <CardTitle tag="h4">Hábitos Capilares</CardTitle>
                </CardHeader>
                {Object.values(capilar_fields[3]).map((data, index) => {
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
                            options={capilar_options[3][index]}
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
                <CardHeader>
                  <CardTitle tag="h4">Diagnostico Capilar</CardTitle>
                </CardHeader>
                {Object.values(capilar_fields[4]).map((dato, index) => {
                  return (
                    <Col md="6" sm="12" className="mb-1" key={dato.identifier}>
                      <Label className="form-label" for={dato.identifier}>
                        {dato.label}
                      </Label>
                      <Controller
                        control={control}
                        id={dato.identifier}
                        name={dato.identifier}
                        defaultValue={capilar_options[4][index]}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="textarea"
                            placeholder='Escribe...'
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
                    >
                      Guardar
                    </Button>
                    <Button
                      className="me-1"
                      color="secondary"
                      onClick={async () => {
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
        <TabPane tabId="3">
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <CardHeader>
                  <CardTitle tag="h4">Datos de Color Peluqueria</CardTitle>
                </CardHeader>
                {Object.values(color_fields[1]).slice(0, 1).map((data, index) => {
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
                            options={color_options[1][index]}
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
                {Object.values(color_fields[1]).slice(1, 6).map((dato, index) => {
                  return (
                    <Col md="6" sm="12" className="mb-1" key={dato.identifier}>
                      <Label className="form-label" for={dato.identifier}>
                        {dato.label}
                      </Label>
                      <Controller
                        control={control}
                        id={dato.identifier}
                        name={dato.identifier}
                        defaultValue={color_fields[1][index]}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="textarea"
                            placeholder='Escribe...'
                          />
                        )}
                      />
                    </Col>
                  );
                })}
                {Object.values(color_fields[1]).slice(6, 7).map((dato, index) => {
                  return (
                    <Col md="12" sm="12" className="mb-1" key={dato.identifier}>
                      <Label className="form-label" for={dato.identifier}>
                        {dato.label}
                      </Label>
                      <Controller
                        control={control}
                        id={dato.identifier}
                        name={dato.identifier}
                        defaultValue={color_fields[1][index]}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="textarea"
                            placeholder='Escribe...'
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
                    >
                      Guardar
                    </Button>
                    <Button
                      className="me-1"
                      color="secondary"
                      onClick={async () => {
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
      </TabContent>
    </Card>
  );
};
export default SheetTabs;
