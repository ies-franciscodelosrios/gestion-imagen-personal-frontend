// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'


// ** Renders Client Columns

const renderClient = row => {
  if (false && row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={'light-primary'}
        content={row.name || 'John Doe'}
      />
    )
  }
}



export const columns = [

  {
    name: 'Nombre Completo',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/client/view/${row.id}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>{row.name.concat(' ',row.surname)}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'dni',
    sortable: true,
    minWidth: '80px',
    sortField: 'dni',
    selector: row => row.dni,
    cell: row => <span className='text-capitalize'>{row.dni}</span>
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '200px',
    sortField: 'email',
    selector: row => row.email,
    cell: row => <span className='text-capitalize'>{row.email}</span>
  },
  {
    name: 'Fecha de Nacimiento',
    minWidth: '200px',
    sortable: true,
    sortField: 'birth_date',
    selector: row => row.birth_date,
    cell: row => <span className='text-capitalize'>{row.birth_date}</span>
  },
  {
    name: 'Teléfono',
    minWidth: '170px',
    sortable: true,
    sortField: 'phone',
    selector: row => row.phone,
    cell: row => <span className='text-capitalize'>{row.phone}</span>
  },
 
  {
    name: 'Acciones',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
      </div>
    )
  }
]
