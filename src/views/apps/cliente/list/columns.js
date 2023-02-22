// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deleteUser } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
/*
const renderClient = row => {
  if (false && row.avatar.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.fullName || 'John Doe'}
      />
    )
  }
}
*/
// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User
    },
    maintainer: {
      class: 'text-success',
      icon: Database
    },
    editor: {
      class: 'text-info',
      icon: Edit2
    },
    author: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
      {row.role}
    </span>
  )
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
    sortField: 'fullName',
    selector: row => row.Name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {/*{renderClient(row)}*/}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
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
    sortField: 'id',
    selector: row => row.DNI,
    cell: row => <span className='text-capitalize'>{row.DNI}</span>
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '140px',
    sortField: 'email',
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
    name: 'Teléfono',
    minWidth: '230px',
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
              to={`/apps/user/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Detalles</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Editar</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteUser(row.id))
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
