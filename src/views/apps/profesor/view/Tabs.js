// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Bookmark, Edit3, Book } from 'react-feather'

// ** User Components

import SecurityTab from './SecurityTab'
import BillingPlanTab from './BillingTab'
import UserTimeline from './UserTimeline'
import Tratamientos from './Tratamientos'
import UserProjectsList from './UserProjectsList'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Perfil</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Edit3 className='font-medium-3 me-50' />
            <span className='fw-bold'>Configuracion</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Bookmark className='font-medium-3 me-50' />
            <span className='fw-bold'>Notificaciones</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <Book className='font-medium-3 me-50' />
            <span className='fw-bold'>Tratamientos</span>
          </NavLink>
        </NavItem>
       
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserProjectsList />
          <UserTimeline />
        </TabPane>
        <TabPane tabId='2'>
          <SecurityTab />
        </TabPane>
        <TabPane tabId='3'>
          <BillingPlanTab />
        </TabPane>
        <TabPane tabId='4'>
          <Tratamientos />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs