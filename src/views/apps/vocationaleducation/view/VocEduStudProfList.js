// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVocationalEducation, updateVocationalEducation } from '../store';

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
    ModalHeader
} from 'reactstrap'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { toast } from 'react-hot-toast';
import { validateVocEduData } from '../../../../utility/Utils';

const VocEduInfoCard = ({ id }) => {
    // ** Store Vars
    const dispatch = useDispatch();
    const store = useSelector(state => state.vocedu)
    const selectedVocEdu =
        id == "0"
            ? {
                short_name: "",
                long_name: "",
                description: "",
            }
            : store.selectedVocationalEducation;

    // ** State
    const [show, setShow] = useState(false)
    const isEditing = id !== "0";

    useEffect(() => {
        if (id == "0") {
            setShow(true);
        }
    }, []);

    return (
        <Fragment>
              
        </Fragment>
    );

}

export default VocEduStudProfList;
