// ** Reactstrap Imports
import {
    Card,
    CardHeader,
    Progress,
    Row,
    Col,
    Form,
    CardBody,
    CardTitle,
    Button,
    Input,
    Label,
} from 'reactstrap';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store';
import { toast } from 'react-hot-toast';

const ProfesorSheetsList = () => {
    // ** Store Vars
    const dispatch = useDispatch();
    const store = useSelector((state) => state.users);
    const inputs = {
        Alergias: '',
        Patologias: '',
        Intervenciones: '',
        Medicamento: '',
        Protesis: '',
        Otros_antecedentes: '',
        Fuma: '',
        Frecuencia_fuma: '',
        alcohol: '',
        Frecuencia_alcohol: '',
        agua: '',
        Frecuencia_agua: '',
        deporte: '',
        Frecuencia_deporte: '',
        tipo_vida: '',
        tolerancia_solar: '',
        Cicatricacion: '',
        Alimentacion: '',
        tratamientos: '',
        Problema: '',
        Problema_tiempo: '',
        Problema_relacion: '',
        Cosmeticos: '',
        Otros_esteticos: '',
    }

    const [data, setData] = useState(store.selectedUser.More_Info.length > 10 ? JSON.parse(store.selectedUser.More_Info) : inputs);

    const { reset, handleSubmit, control } = useForm({ inputs });

    // ** Get data on mount
    useEffect(() => {
        try {
            setData(JSON.parse(store.selectedUser.More_Info));
        } catch (error) {
            setData({});
        }
        handleReset();
    }, [dispatch, store.selectedUser]);

    /**
     * Funcition that excute the save button
     * @param {*} data to save into user
     */
    const onSubmit = async (data) => {
        await setData(data);
        const updatedClient = { ...store.selectedUser };
        updatedClient.More_Info = JSON.stringify(data);
        dispatch(updateClient(updatedClient));
    };

    const handleReset = () => {
        reset({
            Alergias: data.Alergias,
            Patologias: data.Patologias,
            Intervenciones: data.Intervenciones,
            Medicamento: data.Medicamento,
            Protesis: data.Protesis,
            Otros_antecedentes: data.Otros_antecedentes,
            Fuma: data.Fuma,
            Frecuencia_fuma: data.Frecuencia_fuma,
            alcohol: data.alcohol,
            Frecuencia_alcohol: data.Frecuencia_alcohol,
            agua: data.agua,
            Frecuencia_agua: data.Frecuencia_agua,
            deporte: data.deporte,
            Frecuencia_deporte: data.Frecuencia_deporte,
            tipo_vida: data.tipo_vida,
            tolerancia_solar: data.tolerancia_solar,
            Cicatricacion: data.Cicatricacion,
            Alimentacion: data.Alimentacion,
            tratamientos: data.tratamientos,
            Problema: data.Problema,
            Problema_tiempo: data.Problema_tiempo,
            Problema_relacion: data.Problema_relacion,
            Cosmeticos: data.Cosmeticos,
            Otros_esteticos: data.Otros_esteticos,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Antecedentes de Salud</CardTitle>
            </CardHeader>

            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)} id="More_Info">
                    <Row>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Alergias">
                                Alergias
                            </Label>
                            <Controller
                                defaultValue={data.Alergias}
                                control={control}
                                id="Alergias"
                                name="Alergias"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Alergias" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Patologias">
                                Patologías
                            </Label>
                            <Controller
                                defaultValue={data.Patologias}
                                control={control}
                                id="Patologias"
                                name="Patologias"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Patologías" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Intervenciones">
                                Intervenciones Quirúrgicas
                            </Label>
                            <Controller
                                defaultValue={data.Intervenciones}
                                control={control}
                                id="Intervenciones"
                                name="Intervenciones"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Intervencion..." />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Medicamento">
                                Medicamento
                            </Label>
                            <Controller
                                defaultValue={data.Medicamento}
                                control={control}
                                id="Medicamento"
                                name="Medicamento"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Paracetamol" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Protesis">
                                Prótesis
                            </Label>
                            <Controller
                                defaultValue={data.Protesis}
                                control={control}
                                id="Protesis"
                                name="Protesis"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Cadera" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Otros_antecedentes">
                                Otros
                            </Label>
                            <Controller
                                defaultValue={data.Otros_antecedentes}
                                control={control}
                                id="Otros_antecedentes"
                                name="Otros_antecedentes"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Otros antecedentes..."
                                    />
                                )}
                            />
                        </Col>
                    </Row>

                    <CardHeader>
                        <CardTitle tag="h4">Hábitos de Vida</CardTitle>
                    </CardHeader>

                    <Row>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Fuma">
                                Fuma
                            </Label>
                            <Controller
                                defaultValue={data.Fuma}
                                control={control}
                                id="Fuma"
                                name="Fuma"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Fumador" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Frecuencia_fuma">
                                Frecuencia
                            </Label>
                            <Controller
                                defaultValue={data.Frecuencia_fuma}
                                control={control}
                                id="Frecuencia_fuma"
                                name="Frecuencia_fuma"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Frecuente" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="alcohol">
                                Bebe(alcohol)
                            </Label>
                            <Controller
                                defaultValue={data.alcohol}
                                control={control}
                                id="alcohol"
                                name="alcohol"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Bebedor" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Frecuencia_alcohol">
                                Frecuencia
                            </Label>
                            <Controller
                                defaultValue={data.Frecuencia_alcohol}
                                control={control}
                                id="Frecuencia_alcohol"
                                name="Frecuencia_alcohol"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Frecuente" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="agua">
                                Bebe(agua)
                            </Label>
                            <Controller
                                defaultValue={data.agua}
                                control={control}
                                id="agua"
                                name="agua"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Si" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Frecuencia_agua">
                                Frecuencia
                            </Label>
                            <Controller
                                defaultValue={data.Frecuencia_agua}
                                control={control}
                                id="Frecuencia_agua"
                                name="Frecuencia_agua"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Muy Frecuente" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="deporte">
                                Deporte
                            </Label>
                            <Controller
                                defaultValue={data.deporte}
                                control={control}
                                id="deporte"
                                name="deporte"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Deportista" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Frecuencia_deporte">
                                Frecuencia
                            </Label>
                            <Controller
                                defaultValue={data.Frecuencia_deporte}
                                control={control}
                                id="Frecuencia_deporte"
                                name="Frecuencia_deporte"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Frecuente" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="tipo_vida">
                                Tipo de Vida
                            </Label>
                            <Controller
                                defaultValue={data.tipo_vida}
                                control={control}
                                id="tipo_vida"
                                name="tipo_vida"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Sedentaria" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="tolerancia_solar">
                                Tolerancia Solar
                            </Label>
                            <Controller
                                defaultValue={data.tolerancia_solar}
                                control={control}
                                id="tolerancia_solar"
                                name="tolerancia_solar"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Lo Tolera" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Cicatricacion">
                                Cicatricación
                            </Label>
                            <Controller
                                defaultValue={data.Cicatricacion}
                                control={control}
                                id="Cicatricacion"
                                name="Cicatricacion"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Normal" />
                                )}
                            />
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Alimentacion">
                                Alimentación
                            </Label>
                            <Controller
                                defaultValue={data.Alimentacion}
                                control={control}
                                id="Alimentacion"
                                name="Alimentacion"
                                render={({ field }) => (
                                    <Input {...field} type="text" placeholder="Saludable" />
                                )}
                            />
                        </Col>
                    </Row>

                    <CardHeader>
                        <CardTitle tag="h4">Antecedentes Estéticos</CardTitle>
                    </CardHeader>

                    <Row>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="tratamientos">
                                Tratamientos anteriores y resultado obtenido:
                            </Label>
                            <Controller
                                defaultValue={data.tratamientos}
                                control={control}
                                id="tratamientos"
                                name="tratamientos"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Tratamientos actuales"
                                    />
                                )}
                            />{' '}
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Problema">
                                Problema actual:
                            </Label>
                            <Controller
                                defaultValue={data.Problema}
                                control={control}
                                id="Problema"
                                name="Problema"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Problemas actuales"
                                    />
                                )}
                            />{' '}
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Problema_tiempo">
                                Desde cuando:
                            </Label>
                            <Controller
                                defaultValue={data.Problema_tiempo}
                                control={control}
                                id="Problema_tiempo"
                                name="Problema_tiempo"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Duracion de el/los problema/s"
                                    />
                                )}
                            />{' '}
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Problema_relacion">
                                Con qué lo relaciona:
                            </Label>
                            <Controller
                                defaultValue={data.Problema_relacion}
                                control={control}
                                id="Problema_relacion"
                                name="Problema_relacion"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Correlacion al problema"
                                    />
                                )}
                            />{' '}
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Cosmeticos">
                                Cosméticos que utiliza:
                            </Label>
                            <Controller
                                defaultValue={data.Cosmeticos}
                                control={control}
                                id="Cosmeticos"
                                name="Cosmeticos"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Cosmeticos usados"
                                    />
                                )}
                            />{' '}
                        </Col>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="Otros_esteticos">
                                Otros:
                            </Label>
                            <Controller
                                defaultValue={data.Otros_esteticos}
                                control={control}
                                id="Otros_esteticos"
                                name="Otros_esteticos"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Cosmeticos usados"
                                    />
                                )}
                            />{' '}
                        </Col>
                        <Col sm="12">
                            <div className="d-flex">
                                <Button className="me-1" color="primary" type="submit" onClick={() => toast.success('Correctamente Guardado!')}>
                                    Guardar
                                </Button>
                                <Button
                                    className="me-1"
                                    color="secondary"
                                    onClick={() => {
                                        handleReset();
                                        toast.error('Borrado de datos no guardados')
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    );
};

export default ProfesorSheetsList;
