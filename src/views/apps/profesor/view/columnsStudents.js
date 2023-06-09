// ** React Imports
import { Link } from 'react-router-dom'

// ** Table columns
export const columns = [
  {
    name: 'Nombre Completo',
    sortable: true,
    minWidth: '250px',
    sortField: 'fullname',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
       
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
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
    cell: row => row.dni
  },{
    minWidth: '200px',
    name: 'Curso',
    sortable: true,
    sortField: 'course_year',
    selector: row => row.cycle,
    cell: row => row.cycle
  }
]
