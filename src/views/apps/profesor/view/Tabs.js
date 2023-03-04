// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'

// ** User Components
import InvoiceList from './InvoiceList'
import SecurityTab from './SecurityTab'
import Connections from './Connections'
import BillingPlanTab from './BillingTab'
import UserTimeline from './UserTimeline'
import Notifications from './Notifications'
import UserProjectsList from './UserProjectsList'
import ProfesorSheetList from './ProfesorSheetsList'
const UserTabs = ({ active, toggleTab, profesor }) => {
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
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Configuracion</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('4')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Notificaciones</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Alumnos</span>
          </NavLink>
        </NavItem>
        
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
        <ProfesorSheetList profesor={profesor}/>
        </TabPane>
        <TabPane tabId='2'>
          <SecurityTab />
        </TabPane>
        <TabPane tabId='3'>
          <SecurityTab />
        </TabPane>
        <TabPane tabId='4'>
          <SecurityTab />
        </TabPane>
   
       
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
