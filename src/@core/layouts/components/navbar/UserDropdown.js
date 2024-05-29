// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
// import defaultAvatar from 'http://localhost:8000/storage/img.jpg'

import { error } from 'jquery'
import { getUser } from '../../../../views/apps/student/store'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.users);

  // ** State
  const [userData, setUserData] = useState(null)
  const selectedUser = store.selectedUser;

  //** ComponentDidMount
  useEffect(() => {
    const userDataAux = JSON.parse(localStorage.getItem('userData'))
    if (isUserLoggedIn() !== null) {
      setUserData(userDataAux)
      dispatch(getUser(parseInt(userDataAux.id)));
    }
  }, [])

  //** Vars

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(userData && userData['fullname']) || 'Usuario'}</span>
          <span className='user-status'>{ (userData && userData['rol'])|| 'Admin'}</span>
        </div>
        {<Avatar img={(selectedUser && selectedUser['image'] ? selectedUser['image'] : "")} initials content={JSON.parse(localStorage.getItem('userData')).name || 'Usuario'} imgHeight='50' imgWidth='50' status='online' className='me-1' color={'light-primary'}/>}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/pages/profile'>
          <User size={14} className='me-75' />
          <span className='align-middle'>Perfil</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/pages/faq'>
          <HelpCircle size={14} className='me-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Cerrar Sesión</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
