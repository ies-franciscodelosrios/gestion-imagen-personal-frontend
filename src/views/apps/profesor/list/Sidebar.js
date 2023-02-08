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
import { addUser } from '../store'
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
  const onSubmit = data => {
    setData(data)
    toggleSidebar()
    dispatch(
      addUser({
        id:15,
        name: data.nombre,
        apellido: data.email,
        ciclo: data.ciclo,
        curso: data.curso,
        email: data.email,
      })
    )

  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Nuevo profesor'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='nombre'>
            Nombre <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='nombre'
            control={control}
            render={({ field }) => (
              <Input id='nombre' placeholder='Juan' invalid={errors.fullName && true} {...field} />
            )}
          />
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='apellido'>
            Apellido <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='apellido'
            control={control}
            render={({ field }) => (
              <Input id='apellido' placeholder='Carmona López' invalid={errors.fullName && true} {...field} />
            )}
          />
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='curso'>
            Curso <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='curso'
            control={control}
            render={({ field }) => (
              <Input id='curso' placeholder='2' invalid={errors.username && true} {...field} />
            )}
          />
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='ciclo'>
            Ciclo <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='ciclo'
            control={control}
            render={({ field }) => (
              <Input id='ciclo' placeholder='Peluqueria' invalid={errors.username && true} {...field} />
            )}
          />
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='userEmail'>
            Email <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                type='email'
                id='userEmail'
                placeholder='john.doe@example.com'
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          <FormText color='muted'>You can use letters, numbers & periods</FormText>
        </div>

        <Button type='submit' className='me-1' color='primary'>
          Añadir
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancelar
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
