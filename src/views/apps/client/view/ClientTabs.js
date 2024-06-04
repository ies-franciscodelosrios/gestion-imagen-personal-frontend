// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock } from 'react-feather'

// ** User Components
import ClientSheetsList from './ClientSheetsList'
import HistorialTratamientos from './historial_medico/HistorialTratamientos'

const ClientTabs = ({ active, toggleTab, entity, setEntity }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
      <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Fichas</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Historial de Tratamientos</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <ClientSheetsList entity={entity} setEntity={setEntity}/>
        </TabPane>
        <TabPane tabId='2'>
          <HistorialTratamientos entity={entity}></HistorialTratamientos>
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default ClientTabs
