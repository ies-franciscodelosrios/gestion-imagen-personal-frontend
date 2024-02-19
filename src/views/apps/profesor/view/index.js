// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
import {
  getProfessorById,
  getAppointments,
  getAllVocationalEducation,
} from "../store";
import { useSelector, useDispatch } from "react-redux";

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import UserTabs from "./Tabs";
import UserInfoCard from "./UserInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";

const TeacherView = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profesor);

  // ** Hooks
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllVocationalEducation());
    if (id > 0) {
      dispatch(getProfessorById(parseInt(id)));
      dispatch(getAppointments());
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
          return (
            <UserInfoCard
              id={id}
              selectedProfesor={{
                name: "",
                surname: "",
                email: "",
                dni: "",
                course_year: "",
                cycle: "",
                password: "",
                repassword: "",
              }}
              vocationalEducation={store.vocationalEducation}
            />
          );
        } else if (
          store.selectedProfesor !== null &&
          store.selectedProfesor !== undefined
        ) {
          return (
            <div className="app-user-view">
              <Row>
                <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
                  <UserInfoCard
                    id={id}
                    selectedProfesor={store.selectedProfesor}
                    vocationalEducation={store.vocationalEducation}
                  />
                </Col>
                <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
                  <UserTabs
                    active={active}
                    toggleTab={toggleTab}
                    selectedProfesor={store.selectedProfesor}
                  />
                </Col>
              </Row>
            </div>
          );
        } else {
          <Alert color="danger">
            <h4 className="alert-heading">Profesor no encontrado</h4>
            <div className="alert-body">
              Profesor con id: {id} no existe. Revise la lista de profesores:{" "}
              <Link to="/apps/profesor/list">Lista de profesores</Link>
            </div>
          </Alert>;
        }
      })()}
    </div>
  );
};
export default TeacherView;
