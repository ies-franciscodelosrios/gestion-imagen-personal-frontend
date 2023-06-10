// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'


// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2 } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Teacher Columns

const renderTeacher = row => {
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

export const columns = [

  {
    name: 'Nombre Completo',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderTeacher(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/profesor/view/${row.id}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>{row.name.concat(' ', row.surname)}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'DNI',
    sortable: true,
    minWidth: '80px',
    sortField: 'id',
    selector: row => row.dni,
    cell: row => <span className='text-capitalize'>{row.dni}</span>
  },
  {
    name: 'Ciclo',
    sortable: true,
    minWidth: '80px',
    sortField: 'cycle',
    selector: row => row.cycle,
    cell: row => <span className='text-capitalize'>{row.cycle}</span>
  },
  {
    name: 'email',
    sortable: true,
    minWidth: '140px',
    sortField: 'email',
    selector: row => row.email,
    cell: row => <span >{row.email}</span>
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <></>
    )
  }
]
