// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getClient } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import PlanCard from './PlanCard'
import ClientInfoCard from './ClientInfoCard'
import illustration from '@src/assets/images/pages/ilustracion-perfil.png';


// ** Styles
import '@styles/react/apps/app-users.scss'
import SheetTabs from './SheetTabs'

const ClientView = () => {
  // ** Store Vars
  const store = useSelector(state => state.clients)
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getClient(parseInt(id)))
  }, [dispatch])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return store.selectedClient !== null && store.selectedClient !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <ClientInfoCard />
          <div className="mt-auto">
            <img className="img-fluid" src={illustration} alt="illustration" />
          </div>
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
      <Row>
        {' '}
        <Col sm="12">
          <SheetTabs selectedClient={store.selectedClient}></SheetTabs>
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Cliente no encontrado</h4>
      <div className='alert-body'>
        Cliente con id: {id} no existe. Revise la lista de clientes: <Link to='/apps/client/list'>Lista Clientes</Link>
      </div>
    </Alert>
  )
}
export default ClientView
