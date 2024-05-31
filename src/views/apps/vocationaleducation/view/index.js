// ** React Imports
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
import { getVocationalEducation } from "../store";
import { useSelector, useDispatch } from "react-redux";

// ** Reactstrap Imports
import { Col, Alert } from "reactstrap";

// ** User View Components
import VocEduInfoCard from "./VocEduInfoCard";
import illustration from "@src/assets/images/users/Barber-rafiki.png";

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
    }
  }, [dispatch]);

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
              <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
                <VocEduInfoCard id={id} />
                <div className="mt-auto">
                  <img className="img-fluid" src={illustration} alt="illustration" />
                </div>
              </Col>
              <col>
                
              </col>
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
