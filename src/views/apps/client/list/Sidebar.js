// ** React Import
import { useState } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss'

// Toast styles
import { toast } from 'react-hot-toast';
import '@styles/react/libs/react-select/_react-select.scss';

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form';

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap';

// ** Store & Actions
import { AddClient } from '../../../../services/api';

const defaultValues = {
  dni: '',
  name: '',
  surname: '',
  email: '',
  phone: '',
  birth_date: ''
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

const SidebarNewClients = ({ open, toggleSidebar, reload }) => {
  // ** States
  const [BirthPicker, setBirthPicker] = useState(new Date());

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ** Function to handle form submit
  const onSubmit = async (data) => {
    data.birth_date = BirthPicker.toISOString().split('T')[0];
    if (checkIsValid(data)) {
      toggleSidebar();
      await AddClient(
        {
          dni: data.dni,
          name: data.name,
          surname: data.surname,
          email: data.email,
          phone: data.phone,
          birth_date: data.birth_date,
          more_info: ' ',
          life_style: ' ',
          background_health: ' ',
          background_aesthetic: ' ',
          asthetic_routine: ' ',
          hairdressing_routine: ' '
        }
      ).then(() => {
        toast.success('Correctamente Guardado!');
      }).catch(()=>{
        toast.error('Error al guardar cliente!');
      })
      reload(true);

    } else {
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
          <Label className="form-label" for="dni">
            DNI <span className="text-danger">*</span>
          </Label>
          <Controller
            name="dni"
            control={control}
            render={({ field }) => (
              <Input
                id="dni"
                placeholder="31000000Y"
                invalid={errors.dni && true}
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
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                id="name"
                placeholder="Pedro"
                invalid={errors.name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="surname">
            Apellido <span className="text-danger">*</span>
          </Label>
          <Controller
            name="surname"
            control={control}
            render={({ field }) => (
              <Input
                id="surname"
                placeholder="Torres"
                invalid={errors.surname && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="email">
            Email <span className="text-danger">*</span>
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                id="email"
                placeholder="nombre@gmail.com"
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          <FormText color="muted">
            Puedes usar letras, numero y simbolos.
          </FormText>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="phone">
            Teléfono <span className="text-danger">*</span>
          </Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                id="phone"
                type='number'
                placeholder="681 681 681"
                invalid={errors.phone && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="birth_date">
            Fecha de Nacimiento
          </Label>
          <Flatpickr
            required
            locale="es"
            id="birth_date"
            name="birth_date"
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
                    'Sábado'
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

export default SidebarNewClients;
