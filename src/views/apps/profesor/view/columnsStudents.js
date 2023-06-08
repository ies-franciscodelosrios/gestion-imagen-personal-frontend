// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'



// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Clipboard,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle,
  BookOpen,
  ChevronsRight
} from 'react-feather'
import { getProfesor } from '../store'



const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}
// ** Table columns
export const columns = [
  {
    name: 'Nombre Completo',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullname',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
       
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getProfesor(row.id))}
          >
            <span className='fw-bolder'>{row.name.concat(' ',row.surname)}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },{
    minWidth: '200px',
    name: 'DNI',
    sortable: true,
    sortField: 'dni',
    selector: row => row.dni,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
       
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/Tratamientos/${row.dni}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getAppointmentbyDniStudent(row.dni))}
          >
            <span className='fw-bolder'>{row.name.concat(' ',row.surname)}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  } ,   {
    minWidth: '200px',
    name: 'Nombre',
    sortable: true,
    sortField: 'name',
    selector: row => row.name,
    cell: row => row.name
  } ,   {
    minWidth: '200px',
    name: 'Apellidos',
    sortable: true,
    sortField: 'surname',
    selector: row => row.surname,
    cell: row => row.surname
  } ,
  {
    minWidth: '200px',
    name: 'Año escolar',
    sortable: true,
    sortField: 'course_year',
    selector: row => row.course_year,
    cell: row => row.course_year
  },{
    minWidth: '200px',
    name: 'Curso',
    sortable: true,
    sortField: 'course_year',
    selector: row => row.cycle,
    cell: row => row.cycle
  },
  {
    minWidth: '200px',
    name: 'Correo electronico',
    sortable: true,
    sortField: 'email',
    selector: row => row.email,
    cell: row => row.email
  }
]
