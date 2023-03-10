// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getClient, deleteClient } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

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
        content={row.Name || 'John Doe'}
      />
    )
  }
}





const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [

  {
    name: 'Nombre Completo',
    sortable: true,
    minWidth: '300px',
    sortField: 'Name',
    selector: row => row.Name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/client/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getClient(row.id))}
          >
            <span className='fw-bolder'>{row.Name.concat(' ',row.Surname)}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.Email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'DNI',
    sortable: true,
    minWidth: '80px',
    sortField: 'DNI',
    selector: row => row.DNI,
    cell: row => <span className='text-capitalize'>{row.DNI}</span>
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '200px',
    sortField: 'Email',
    selector: row => row.Email,
    cell: row => <span className='text-capitalize'>{row.Email}</span>
  },
  {
    name: 'Fecha de Nacimiento',
    minWidth: '200px',
    sortable: true,
    sortField: 'Birth_Date',
    selector: row => row.Birth_Date,
    cell: row => <span className='text-capitalize'>{row.Birth_Date}</span>
  },
  {
    name: 'Tel??fono',
    minWidth: '170px',
    sortable: true,
    sortField: 'Phone',
    selector: row => row.Phone,
    cell: row => <span className='text-capitalize'>{row.Phone}</span>
  },
 
  {
    name: 'Acciones',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/client/view/${row.id}`}
              onClick={() => store.dispatch(getClient(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Detalles</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteClient(row.id));
                
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Eliminar</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
