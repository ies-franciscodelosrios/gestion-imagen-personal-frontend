import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, ModalHeader, ModalBody, Form, Row, Col, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-hot-toast';

const ClientModal = ({ isOpen, toggle, entity, id, onSubmit, onReset }) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Reset form and set initial values when entity changes
    reset({
      name: entity ? entity.name : '',
      surname: entity ? entity.surname : '',
      email: entity ? entity.email : '',
      dni: entity ? entity.dni : '',
      phone: entity ? entity.phone : '',
      birth_date: entity ? entity.birth_date : '',
    });
  }, [entity, reset]);

  const handleOnSubmit = (data) => {
    onSubmit(data);
  };

  const handleReset = () => {
    reset();
    onReset();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered modal-lg">
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 pt-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">{!id ? "Añadir cliente" : "Editar cliente"}</h1>
          <p>{!id ? "Añadir un nuevo cliente." : "Actualizar los datos del Cliente de manera segura."}</p>
        </div>
        <Form onSubmit={handleSubmit(handleOnSubmit)}>
          <Row className="gy-1 pt-75">
            <Col md={6} xs={12}>
              <Label className="form-label" for="name">Nombre</Label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input {...field} placeholder="Marta" invalid={errors.name && true} />
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="surname">Apellidos</Label>
              <Controller
                control={control}
                name="surname"
                render={({ field }) => (
                  <Input {...field} placeholder="Torres" invalid={errors.surname && true} />
                )}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="email">Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input {...field} type="email" placeholder="nombre@gmail.com" invalid={errors.email && true} />
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="dni">DNI</Label>
              <Controller
                control={control}
                name="dni"
                render={({ field }) => (
                  <Input {...field} placeholder="31000000C" invalid={errors.dni && true} />
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="phone">Teléfono</Label>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Input {...field} type="number" placeholder="609 933 442" invalid={errors.phone && true} />
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="birth_date">Fecha de Nacimiento</Label>
              <Controller
                control={control}
                name="birth_date"
                render={({ field }) => (
                  <Input {...field} type="date" className="form-control" />
                )}
              />
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">Guardar</Button>
              <Button type="reset" color="secondary" outline onClick={handleReset}>Cancelar</Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ClientModal;
