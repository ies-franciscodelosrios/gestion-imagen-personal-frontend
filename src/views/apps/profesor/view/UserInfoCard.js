// ** React Imports
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfesor, updateProfesor } from "../store";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router";


// ** Custom Components
import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { toast } from "react-hot-toast";
import { validateDNI, validateUserData } from "../../../../utility/Utils";

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ id, selectedProfesor, vocationalEducation }) => {

const navigateTo = useNavigate();
  
  // ** Store Vars
  const dispatch = useDispatch();

  // ** State
  const [show, setShow] = useState(false);
  const [selectedVocEdu, setSelectedVocEdu] = useState({
    value: "",
    label: "",
  });
  const isEditing = selectedProfesor.password != ""; // Asume que selectedProfesor es null si estás añadiendo un nuevo profesor

  useEffect(() => {
    if (id == "0") {
      setShow(true);
    }
    setSelectedVocEdu(
      vocationalEducation.find((item) =>
        item.value == selectedProfesor.cycle ? item : null
      )
    );
  }, [id, selectedProfesor]);

  // ** Hook
  const {
    reset,
    control,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: selectedProfesor.name,
      surname: selectedProfesor.surname,
      email: selectedProfesor.email,
      dni: selectedProfesor.dni,
      course_year: selectedProfesor.course_year,
      password: "",
      repassword: "",
    },
  });

  const renderUserImg = () => {
    return (
      <Avatar
        img={(selectedProfesor && selectedProfesor['image'] ? selectedProfesor['image'] : "")}
        initials
        color={"light-primary"}
        className="rounded mt-3 mb-2"
        content={selectedProfesor.name}
        contentStyles={{
          borderRadius: 0,
          fontSize: "calc(48px)",
          width: "100%",
          height: "100%",
        }}
        style={{
          height: "110px",
          width: "110px",
        }}
      />
    );
  };

  const onSubmit = (dataForm) => {
    const updatedProfesor = { ...selectedProfesor };
    updatedProfesor.name = dataForm.name;
    updatedProfesor.surname = dataForm.surname;
    updatedProfesor.email = dataForm.email;
    updatedProfesor.dni = dataForm.dni;
    updatedProfesor.course_year = dataForm.course_year;
    // Si no se cambia el ciclo no se actualiza el valor, por eso se usa esta variable
    updatedProfesor.cycle = selectedVocEdu.value;
    updatedProfesor.cycle_name = selectedVocEdu.label;
    updatedProfesor.password = dataForm.password;
    updatedProfesor.repassword = dataForm.repassword;
    console.log("there: " + updatedProfesor.cycle_name);

    if (validateUserData(updatedProfesor, isEditing)) {
      if (id == "0") {
        dispatch(addProfesor(updatedProfesor));
        setShow(false);
        navigateTo("/apps/profesor/list");
      } else {
        delete updatedProfesor.password;
        delete updatedProfesor.repassword;
        dispatch(updateProfesor(updatedProfesor));
      }
      setShow(false);
    } else {
      for (const key in dataForm) {
        if (!validateDNI(dataForm.dni)) setError("dni", {});
        if (dataForm.password.length != 0 || dataForm.repassword.length != 0) {
          setError("password", {});
          setError("repassword", {});
        }
      }
    }
  };

  const handleReset = () => {
    reset({
      name: selectedProfesor.name,
      surname: selectedProfesor.surname,
      email: selectedProfesor.email,
      dni: selectedProfesor.dni,
      cycle: selectedProfesor.cycle,
      course_year: selectedProfesor.course_year,
      password: "",
      repassword: "",
    });
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {selectedProfesor !== null
                      ? selectedProfesor.name.concat(
                          " " + selectedProfesor.surname
                        )
                      : "Eleanor Aguilar"}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">Detalles</h4>
          <div className="info-container">
            {selectedProfesor !== null && isEditing ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Nombre: </span>
                  <span>{selectedProfesor.name}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Apellidos: </span>
                  <span>{selectedProfesor.surname}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">DNI: </span>
                  <span>{selectedProfesor.dni}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email: </span>
                  <span>{selectedProfesor.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Curso: </span>
                  <span>{selectedProfesor.course_year}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Ciclo: </span>
                  <span>
                    {
                      vocationalEducation.find((item) => {
                        if (item.value == selectedProfesor.cycle) {
                          return item.label;
                        }
                      }).label
                    }
                  </span>
                </li>
              </ul>
            ) : (
              <img
                style={{ width: 50, display: "block", margin: "0 auto" }}
                src="../../../../src/assets/images/GIF/loading.gif"
                alt="GIF cargando"
              />
            )}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button
              color="primary"
              onClick={() => {
                handleReset();
                setShow(true);
                setSelectedVocEdu(
                  vocationalEducation.find((item) => {
                    if (item.value == selectedProfesor.cycle) {
                      return item;
                    }
                  })
                );
              }}
            >
              Editar
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">
              {id == "0" ? "Añadir profesor" : "Editar profesor"}
            </h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="name">
                  Nombre
                </Label>
                <Controller
                  defaultValue={selectedProfesor.name}
                  control={control}
                  id="name"
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="name"
                      placeholder="Laura"
                      invalid={errors.name && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="surname">
                  Apellidos
                </Label>
                <Controller
                  defaultValue={selectedProfesor.surname}
                  control={control}
                  id="surname"
                  name="surname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="surname"
                      placeholder="Torres"
                      invalid={errors.surname && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Controller
                  defaultValue={selectedProfesor.email}
                  control={control}
                  id="email"
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="nombre@gmail.com"
                      invalid={errors.email && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="password">
                  Contraseña
                </Label>
                <Controller
                  control={control}
                  id="password"
                  name="password"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password"
                      placeholder="Contraseña..."
                      type="password"
                      invalid={errors.password && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="repassword">
                  Repite Contraseña
                </Label>
                <Controller
                  control={control}
                  id="repassword"
                  name="repassword"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="repassword"
                      placeholder="Repite Contraseña..."
                      type="password"
                      invalid={errors.repassword && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="dni">
                  DNI
                </Label>
                <Controller
                  defaultValue={selectedProfesor.dni}
                  control={control}
                  id="dni"
                  name="dni"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="dni"
                      placeholder="31000000C"
                      invalid={errors.dni && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="cycle">
                  Ciclo Formativo <span className="text-danger">*</span>
                </Label>
                <Controller
                  control={control}
                  id="cycle"
                  name="cycle"
                  value={selectedVocEdu}
                  defaultValue={selectedVocEdu}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={vocationalEducation}
                      value={selectedVocEdu}
                      defaultValue={selectedVocEdu}
                      onChange={(value) => {
                        field.onChange(value);
                        setSelectedVocEdu(value);
                      }}
                      className="react-select"
                      classNamePrefix="select"
                      id="cycle"
                      name="cycle"
                      placeholder="Elige tu ciclo"
                      invalid={errors.cycle && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="course_year">
                  Curso
                </Label>
                <Controller
                  defaultValue={selectedProfesor.course_year}
                  control={control}
                  id="course_year"
                  name="course_year"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="course_year"
                      placeholder="23-24"
                      invalid={errors.course_year && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  Guardar
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset();
                    setShow(false);
                    toast.error("Datos no guardados");
                    navigateTo("/apps/profesor/list");
                  }}
                >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default UserInfoCard;
