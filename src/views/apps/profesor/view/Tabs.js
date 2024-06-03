// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { Book } from 'react-feather'

// ** User Components


import Tratamientos from './Tratamientos'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        
       
        <NavItem>
       
            <Book className='font-medium-3 me-50' />
            <span className='fw-bold'>Historial de Tratamientos</span>
        
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