// ** React Imports
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// ** Store & Actions
import { getUser } from '../store';
import { useSelector, useDispatch } from 'react-redux';

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap';

// ** User View Components
import PlanCard from './PlanCard';
import UserInfoCard from './UserInfoCard';
import illustration from '@src/assets/images/users/Barber-rafiki.png';
import UserTabs from './Tabs';

// ** Styles
import '@styles/react/apps/app-users.scss';

const UserView = () => {
  // ** Store Vars
  const store = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // ** Hooks
  const { id } = useParams();

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getUser(parseInt(id)));
  }, [dispatch]);

  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={store.selectedUser} />
          <div className="mt-auto">
            <img className="img-fluid" src={illustration} alt="illustration" />
          </div>
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
        <UserTabs active={active} toggleTab={toggleTab} selectedUser={store.selectedUser} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Alumno no encontrado</h4>
      <div className="alert-body">
        Alumno con id: {id} no existe. Comprueba la lista de usuarios:{' '}
        <Link to="/apps/user/list">Lista de Alumnos</Link>
      </div>
    </Alert>
  );
};
export default UserView;
