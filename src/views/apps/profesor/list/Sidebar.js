// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addUserProfesor } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  email: '',
  contact: '',
  company: '',
  fullName: '',
  username: '',
  country: null
}

const countryOptions = [
  { label: 'Australia', value: 'Australia' },
  { label: 'Bangladesh', value: 'Bangladesh' },
  { label: 'Belarus', value: 'Belarus' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Canada', value: 'Canada' },
  { label: 'China', value: 'China' },
  { label: 'France', value: 'France' },
  { label: 'Germany', value: 'Germany' },
  { label: 'India', value: 'India' },
  { label: 'Indonesia', value: 'Indonesia' },
  { label: 'Israel', value: 'Israel' },
  { label: 'Italy', value: 'Italy' },
  { label: 'Japan', value: 'Japan' },
  { label: 'Korea', value: 'Korea' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'Philippines', value: 'Philippines' },
  { label: 'Russia', value: 'Russia' },
  { label: 'South', value: 'South' },
  { label: 'Thailand', value: 'Thailand' },
  { label: 'Turkey', value: 'Turkey' },
  { label: 'Ukraine', value: 'Ukraine' },
  { label: 'United Arab Emirates', value: 'United Arab Emirates' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'United States', value: 'United States' }
]

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null)
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = (data) => {
    data.Course_year = BirthPicker.toISOString().split('T')[0];
    //data.Cycle = data.Cycle.value;
    console.log(data.Course_year)
    setData(data)
    if (checkIsValid(data)) {
      toggleSidebar()
      console.log(data);
      dispatch(
        addUserProfesor({
          DNI: data.DNI,
          Rol: data.Rol,
          Course_year: data.Course_year,
          Cycle: data.Cycle,
          Name: data.Name,
          Surname: data.Surname,
          email: data.email,
          password: ' ',
          Others: ' '
        })
      );
    } else {
      console.log('not correct');
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
      setValue(key, '')
    }
    setRole('subscriber')
    setPlan('basic')
  }

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
       {/*  <div className="mb-1">
          <Label className="form-label" for="Cycle">
            Ciclo <span className="text-danger">*</span>
          </Label>
          <Controller
            name="Cycle"
            control={control}
            render={({ field }) => (
              <Select
                options={cycleOptions}
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                id="Cycle"
                placeholder="Elige tu ciclo"
                invalid={errors.Cycle && true}
                {...field}
              />

            )}
          />
        </div> */}
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
  )
}

export default SidebarNewUsers
