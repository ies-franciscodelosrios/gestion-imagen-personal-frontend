// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Bookmark, Edit3, Book } from 'react-feather'

// ** User Components
import Tratamientos from './Tratamientos'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
      <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <Book className='font-medium-3 me-50' />
            <span className='fw-bold'>Tratamientos</span>
          </NavLink>
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