// ** React Import
import { useState } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss'


// ** Utils
import { selectThemeColors } from '@utils';

// ** Third Party Components
import Select from 'react-select';
import classnames from 'classnames';
import { useForm, Controller } from 'react-hook-form';

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap';

// ** Store & Actions
import { addUser } from '../store';
import { useDispatch } from 'react-redux';

const defaultValues = {
  DNI: '',
  Name: '',
  Surname: '',
  Email: '',
  Phone: '',
  BirthDate: ''
};

const cycleOptions = [
  { label: 'GM Estetica', value: 'GM Estética' },
  { label: 'GS Estética', value: 'GS Estética' },
  { label: 'GM Peluqueria', value: 'GM Peluqueria' },
  { label: 'GS Peluqueria', value: 'GS Peluqueria' },
];

const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === 'object' ? field !== null : field.length > 0
  );
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null);
  const [BirthPicker, setBirthPicker] = useState(new Date());


  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ** Function to handle form submit
  const onSubmit = (data) => {
    data.BirthDate = BirthPicker.toISOString().split('T')[0];
    //data.Cycle = data.Cycle.value;
    setData(data);
    if (checkIsValid(data)) {
      toggleSidebar();
      //console.log(data);
      dispatch(
        addUser({
          DNI: data.DNI,
          Name: data.Name,
          Surname: data.Surname,
          Email: data.Email,
          Phone: data.Phone,
          BirthDate: data.BirthDate,
          More_Info: '',
          Life_Style: '',
          Background_Health: '',
          Background_Aesthetic: '',
          Asthetic_Routine: '',
          Hairdressing_Routine: ''
        })
      );
    } else {
      console.log('not correct');
      for (const key in data) {
        if (data[key] === null) {
          setError('country', {
            type: 'manual',
          });
        }
      }
    }
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '');
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Nuevo Cliente"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <Label className="form-label" for="DNI">
            DNI <span className="text-danger">*</span>
          </Label>
          <Controller
            name="DNI"
            control={control}
            render={({ field }) => (
              <Input
                id="DNI"
                placeholder="31000000Y"
                invalid={errors.Name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="Name">
            Nombre <span className="text-danger">*</span>
          </Label>
          <Controller
            name="Name"
            control={control}
            render={({ field }) => (
              <Input
                id="Name"
                placeholder="Pedro"
                invalid={errors.Name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="Surname">
            Apellido <span className="text-danger">*</span>
          </Label>
          <Controller
            name="Surname"
            control={control}
            render={({ field }) => (
              <Input
                id="Surname"
                placeholder="Torres"
                invalid={errors.Surname && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="Email">
            Email <span className="text-danger">*</span>
          </Label>
          <Controller
            name="Email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                id="Email"
                placeholder="nombre@gmail.com"
                invalid={errors.Email && true}
                {...field}
              />
            )}
          />
          <FormText color="muted">
            Puedes usar letras, numero y simbolos.
          </FormText>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="Phone">
            Teléfono <span className="text-danger">*</span>
          </Label>
          <Controller
            name="Phone"
            control={control}
            render={({ field }) => (
              <Input
                id="Phone"
                type='number'
                placeholder="681 681 681"
                invalid={errors.Phone && true}
                {...field}
              />
            )}
          />
        </div>
        {/* <div className="mb-1">
          <Label className="form-label" for="Cycle">
            Ciclo Formativo <span className="text-danger">*</span>
          </Label>
          <Controller
            name="Cycle"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="Cycle"
                options={cycleOptions}
                theme={selectThemeColors}
                className={classnames('react-select', {
                  'is-invalid': data !== null && data.Cycle === null,
                })}
                {...field}
              />
            )}
          />
        </div> */}
        <div className="mb-1">
          <Label className="form-label" for="BirthDate">
            Fecha de Nacimiento
          </Label>
          <Flatpickr
            required
            locale="es"
            id="BirthDate"
            name="BirthDate"
            className="form-control"
            onChange={(date) => setBirthPicker(date[0])}
            value={BirthPicker}
            options={{
              enableTime: false,
              dateFormat: 'd-m-Y',
              locale: {
                firstDayOfWeek: 1,
                weekdays: {
                  shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                  longhand: [
                    'Domingo',
                    'Lunes',
                    'Martes',
                    'Miércoles',
                    'Jueves',
                    'Viernes',
                    'Sábado',
                  ],
                },
                months: {
                  shorthand: [
                    'Ene',
                    'Feb',
                    'Mar',
                    'Abr',
                    'May',
                    'Jun',
                    'Jul',
                    'Ago',
                    'Sep',
                    'Оct',
                    'Nov',
                    'Dic',
                  ],
                  longhand: [
                    'Enero',
                    'Febrero',
                    'Мarzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre',
                  ],
                },
              },
            }}
          />
        </div>

        <Button type="submit" className="me-1" color="primary">
          Guardar
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancelar
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
