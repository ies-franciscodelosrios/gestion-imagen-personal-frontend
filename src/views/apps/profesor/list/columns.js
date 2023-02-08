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


export const columns = [
  
  {
    name: 'Profesor',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.name,
    cell: row => (row.name)
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.email,
    cell: row => (row.email)
  },
  {
    name: 'Curso',
    sortable: false,
    minWidth: '172px',
    selector: row => row.curso,
    cell: row => row.curso
  },
  {
    name: 'Ciclo',
    minWidth: '138px',
    sortable: true,
    sortField: 'Ciclo',
    selector: row => row.ciclo,
    cell: row => <span className='text-capitalize'>{row.ciclo}</span>
  }
  ,
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
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
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
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
