// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { logout } from '../../../../redux/authentication'

// ** Default Avatar Image
//  import defaultAvatar from 'http://localhost:8000/storage/img.jpg'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const authStore = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const authUser = authStore.userData;
  //** Vars

  const handleButtonLogout = () => {
    dispatch(logout()).then(()=> navigate("/login"))
  }
 
  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(authUser && authUser['fullname']) || 'Usuario'}</span>
          <span className='user-status'>{ (authUser && authUser['rol'])|| 'Admin'}</span>
        </div>
        {<Avatar img={(authUser && authUser['image'] ? authUser['image'] : "")} initials content={authUser && authUser['name']} imgHeight='50' imgWidth='50' status='online' className='me-1' color={'light-primary'}/>}
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
        <DropdownItem onClick={() => handleButtonLogout()}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Cerrar Sesión</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
