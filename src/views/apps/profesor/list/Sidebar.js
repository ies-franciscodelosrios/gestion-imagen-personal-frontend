// ** Custom Components
import Sidebar from '@components/sidebar'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// Toast styles
import { toast } from 'react-hot-toast';
import '@styles/react/libs/react-select/_react-select.scss';

// ** Third Party Components
import Select from 'react-select'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { AddProfesor } from '../../../../services/api'
import { Controller, useForm } from 'react-hook-form';

const defaultValues = {
  dni: '',
  name: '',
  surname: '',
  email: '',
  cycle: ''
}

const cycleOptions = [
  { label: 'Grado Medio - Peluquería y cosmética capilar', value: 'Grado Medio - Peluquería y cosmética capilar' },
  { label: 'Grado Medio - Estética y belleza', value: 'Grado Medio - Estética y belleza' },
  { label: 'Grado Superior - Estética integral y bienestar', value: 'Grado Superior - Estética integral y bienestar' },
  { label: 'Grado Superior - Estilismo y dirección de peluquería', value: 'Grado Superior - Estilismo y dirección de peluquería' },
];

const checkIsValid = data => {
  return Object.values(data).every(field => 
    typeof field === 'object' ? field !== null : field.length > 0)
}

const SidebarNewProfesor = ({ open, toggleSidebar, reload }) => {

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = async (data) => {
    data.course_year = new Date().toISOString().split('T')[0];
    console.log(data);
    if (checkIsValid(data)) {
      await AddProfesor(
        {
          dni: data.dni,
          rol: data.rol,
          course_year: data.course_year,
          cycle: data.cycle.label,
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: data.password,
          others: ' '
        }
      ).then(() => {
        toast.success('Correctamente Guardado!');
      }).catch(()=>{
        toast.error('Error al guardar profesor!');
      })
      toggleSidebar();
      reload(true);
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError('country', {
            type: 'manual'
          });
        }
      }
    }
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '');
    }
  }

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Nuevo Profesor"
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
                invalid={errors.name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="name">
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
          <Label className="form-label" for="cycle">
            Ciclo <span className="text-danger">*</span>
          </Label>
          <Controller
            name="cycle"
            control={control}
            render={({ field }) => (
              <Select
                options={cycleOptions}
                className='react-select'
                classNamePrefix='select'
                id="cycle"
                placeholder="Elige tu ciclo"
                invalid={errors.cycle && true}
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
        
        <Button type="submit" className="me-1" color="primary">
          Guardar
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancelar
        </Button>
      </Form>
    </Sidebar>
  );
}

export default SidebarNewProfesor