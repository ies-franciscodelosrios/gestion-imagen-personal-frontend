import { Fragment, useState, useEffect } from 'react';
import { getAppointmentByClientId, deleteAppointment } from '../../../../../services/api';
import { columns } from './columns';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import { toast } from 'react-hot-toast';
import '@styles/react/libs/react-select/_react-select.scss';
import {
  Row,
  Col,
  Card,
  Input,
} from 'reactstrap';
import AppointmentCard from '../AppointmentCard';

const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter }) => {
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='12' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Ver</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='25'>25</option>
            </Input>
            <label htmlFor='rows-per-page'>Tratamientos</label>
          </div>
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Buscar:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              onChange={e => handleFilter(e.target.value)}
              placeholder='Nombre cita ...'
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const HistorialTratamientos = ({ entity }) => {
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [sort, setSort] = useState('asc');
  const [sortColumn, setSortColumn] = useState('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagesNumber, setPagesNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, [rowsPerPage, currentPage, searchTerm]);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointmentByClientId(entity?.id);
      
      if (response && response.data) {
        setAppointments(response.data);
      } else {
        console.error('Respuesta del servidor inesperada:', response);
        toast.error('Error al obtener datos de las citas');
      }
    } catch (error) {
      console.error('Error al obtener las citas:', error);
      toast.error('Error al traer datos de las citas');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      toast.success('Cita eliminada con éxito');
      fetchAppointments();
    } catch (error) {
      toast.error('Error al eliminar la cita');
    }
  };

  const handlePagination = page => {
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handleFilter = val => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(() => {
      setSearchTerm(val.toLowerCase());
    }, 1000));
  };

  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={pagesNumber}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    );
  };

  const dataToRender = () => {
    const filteredAppointments = appointments.filter(appointment => {
      const matchesClient = parseInt(appointment.id_client) === parseInt(entity?.id);
      const matchesSearchTerm = appointment.protocol 
        ? appointment.protocol.toLowerCase().includes(searchTerm)
        : true;
      return matchesClient && matchesSearchTerm;
    });

    return filteredAppointments;
  };

  const handleSort = (column, sortDirection) => {
    const nextSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    const filteredAppointments = dataToRender();

    const sortedAppointments = [...filteredAppointments].sort((a, b) => {
      const dateA = new Date(a[column.sortField]);
      const dateB = new Date(b[column.sortField]);

      return nextSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setAppointments(sortedAppointments);
    setSort(nextSortDirection);
    setSortColumn(column.sortField);
  };

  const modifiedColumns = columns(setSelectedRow, setShowModal, handleDelete);

  const handleClose = (value) => {
    setShowModal(value);
    fetchAppointments();
  };

  return (
    <Fragment>
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={modifiedColumns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                searchTerm={searchTerm}
                handleFilter={handleFilter}
                rowsPerPage={rowsPerPage}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
      {selectedRow && showModal ? <AppointmentCard shows={showModal} entity={selectedRow} onClose={handleClose}></AppointmentCard> : null}
    </Fragment>
  );
};

export default HistorialTratamientos;
