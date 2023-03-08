// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Bookmark, Edit3, Book } from 'react-feather'

// ** User Components


import Tratamientos from './Tratamientos'
import Notificaciones from './Notificacions'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        
       
        <NavItem>
       
            <Book className='font-medium-3 me-50' />
            <span className='fw-bold'>Tratamientos Activos</span>
        
        </NavItem>
       
      </Nav>
      <TabContent activeTab={active}>
       
       
        <TabPane tabId='1'>
          <Tratamientos />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs