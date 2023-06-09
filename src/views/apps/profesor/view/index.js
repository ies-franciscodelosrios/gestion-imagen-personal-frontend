// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import illustration from '@src/assets/images/users/Barber-rafiki.png';
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { getUserById } from '../../../../services/api'
import TeacherTabs from './TeacherTabs';


const TeacherView = () => {
  // ** Hooks
  const { id } = useParams()

  // ** Store Vars
  const [entity, setEntity] = useState(null);

  const setNewEntity = (e) => {
    setEntity(e);
  };

  // ** Get suer on mount
  useEffect(() => {
    getUserById(id).then(e => {setEntity(e.data.data)});
  }, [])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return entity !== null && entity !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard entity={entity} setEntity={setNewEntity} />
          <div className="mt-auto">
            <img className="img-fluid" src={illustration} alt="illustration" />
          </div>
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <TeacherTabs active={active} toggleTab={toggleTab} setEntity={setNewEntity} entity={entity} />
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
