// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'

// ** User Components
import SecurityTab from './SecurityTab'
import ClientSheetsList from './ClientSheetsList'

const UserTabs = ({ active, toggleTab, client }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
      <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Cuenta</span>
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Historial de Tratamientos</span>
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <ClientSheetsList client={client}/>
        </TabPane>
        <TabPane tabId='2'>
          <SecurityTab />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
