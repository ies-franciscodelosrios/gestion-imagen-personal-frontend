// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
import { getVocationalEducation } from "../store";
import { useSelector, useDispatch } from "react-redux";

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import VocEduInfoCard from "./VocEduInfoCard";
import illustration from "@src/assets/images/users/Barber-rafiki.png";
import VocEduTabs from "./Tabs";

// ** Styles
import "@styles/react/apps/app-users.scss";

const VocEduView = () => {
  // ** Store Vars
  const store = useSelector((state) => state.vocedu);
  const dispatch = useDispatch();

  // ** Hooks
  const { id } = useParams();

  // ** Get suer on mount
  useEffect(() => {
    if (id > 0) {
      dispatch(getVocationalEducation(parseInt(id)));
      console.log(id)
      console.log(store.selectedVocationalEducation)
    }
  }, [dispatch]);

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div>
      {(() => {
        if (id == "0") {
          return <VocEduInfoCard id={id} />;
        } else if (
          store.selectedVocationalEducation !== null &&
          store.selectedVocationalEducation !== undefined
        ) {
          return (
            <div className="app-user-view">
              <Row>
                <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
                  <VocEduInfoCard id={id} selectedVocationalEducation={store.selectedVocationalEducation} />
                  <div className="mt-auto">
                    <img className="img-fluid" src={illustration} alt="illustration" />
                  </div>
                </Col>
                <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
                  <VocEduTabs
                    active={active}
                    toggleTab={toggleTab}
                    selectedVocationalEducation={store.selectedVocationalEducation}
                  />
                </Col>
              </Row>
            </div>
          )
        } else {
          <Alert color="danger">
            <h4 className="alert-heading">Ciclo Formativo no encontrado</h4>
            <div className="alert-body">
              Ciclo Formativo con id: {id} no existe. Comprueba la lista de ciclos:{" "}
              <Link to="/apps/vocationaleducation/list">Lista de Ciclos Formativos</Link>
            </div>
          </Alert>
        }
      })()}
    </div>
  )
}
export default VocEduView;
