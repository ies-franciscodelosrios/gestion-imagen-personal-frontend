// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getProfesor,getAppointments } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'


const TeacherView = () => {
  // ** Store Vars
  const store = useSelector(state => state.profesor)
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()
  const { cycle } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    console.log(store)
    dispatch(getProfesor(parseInt(id)))
    dispatch(getAppointments())
  }, [dispatch])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return store.selectedProfesor !== null && store.selectedProfesor !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedProfesor={store.selectedProfesor} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} selectedProfesor={store.selectedProfesor} getAllStudentsbyCycle={store.selectedProfesor.cycle} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Profesor no encontrado</h4>
      <div className='alert-body'>
        Profesor con id: {id} no existe. Revise la lista de profesores: <Link to='/apps/profesor/list'>Lista de profesores</Link>
      </div>
    </Alert>
  )
}
export default TeacherView
