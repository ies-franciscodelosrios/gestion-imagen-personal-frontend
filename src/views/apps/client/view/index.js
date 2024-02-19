// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getClientById } from '../../../../services/api'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import ClientTabs from './ClientTabs'
import ClientInfoCard from './ClientInfoCard'
import illustration from '@src/assets/images/pages/ilustracion-perfil.png';


// ** Styles
import '@styles/react/apps/app-users.scss'
import SheetTabs from './SheetTabs'
import { Spinner } from 'react-bootstrap'

const ClientView = () => {
  // ** Hooks
  const { id } = useParams();

  // ** Store Vars
  const [entity, setEntity] = useState(null);

  const setNewEntity = (e) => {
    setEntity(e);
  };

  useEffect(() => {
    if (id > 0) {
      getClientById(id)
        .then(response => {
          setEntity(response.data.data);
        })
        .catch(error => {
          console.error('Error al obtener los datos del cliente:', error);
        });
    }
  }, [id]);

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return (
    <div>
      {(() => {
        if (id === '0') {
          return <ClientInfoCard id={id} />;
        } else if (entity) {
          return (
            <div className="app-user-view">
              <Row>
                <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
                  <ClientInfoCard id={id} entity={entity} setEntity={setNewEntity} />
                </Col>
                <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
                  <ClientTabs active={active} toggleTab={toggleTab} setEntity={setNewEntity} entity={entity} />
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <SheetTabs entity={entity} setEntity={setNewEntity}></SheetTabs>
                </Col>
              </Row>
            </div>
          );
        } else {
          return (
            <Alert color="danger">
              <h4 className="alert-heading">Cliente no encontrado</h4>
              <div className="alert-body">
                Cliente con id: {id} no existe. Revise la lista de clientes:{" "}
                <Link to="/apps/client/list">Lista de clientes</Link>
              </div>
            </Alert>
          );
        }
      })()}
    </div>
  );
};
export default ClientView
