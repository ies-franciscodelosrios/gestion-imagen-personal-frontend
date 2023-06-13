import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Row, Col, Card, Input } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { ChevronDown, Edit } from 'react-feather';
import { getAppointmentPaged } from '../../../../services/api';
import AppointmentCard from '../../client/view/AppointmentCard';
import { columns } from '../../client/view/historial_medico/columns';

const UsersList = (props) => {
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
  const [dniStudent, setDniStudent] = useState(props.dni);


  useEffect(() => {
    fetchAppointments();
  }, [rowsPerPage, currentPage, searchTerm]);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointmentPaged(
        {
        "page": currentPage,
        "perpage": rowsPerPage,
        "searchtext": searchTerm,
        "dni_student": dniStudent, // añade esto
        "dni_client": ''
      });
      
      const { data } = response;
      setPagesNumber(data.last_page);
      setAppointments(data.data);
    } catch (error) {
      console.error('Error al obtener las citas:', error);
      toast.error('Error al traer datos');
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handleFilter = (val) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(setTimeout(() => {
      setSearchTerm(val);
    }, 1000));
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      pageCount={pagesNumber}
      activeClassName='active'
      forcePage={currentPage !== 0 ? currentPage - 1 : 0}
      onPageChange={handlePagination}
      pageClassName='page-item'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      pageLinkClassName='page-link'
      containerClassName='pagination react-paginate justify-content-end my-2 pe-1'
    />
  );

  const dataToRender = () => {
    if (appointments !== undefined && appointments.length > 0) {
      return appointments;
    } else {
      return appointments.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const handleClose = (value) => {
    setShowModal(value);
    fetchAppointments();
  };

  const modifiedColumns = [...columns];
  modifiedColumns[0] = {
    ...modifiedColumns[0],
    cell: (row) => (
      <div type='button' onClick={() => { setSelectedRow(row); setShowModal(true); }}>
        {row.protocol} &nbsp; <Edit size={14} className='me-50' />
      </div>
    )
  };

  return (
    <>
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
            subHeaderComponent={(
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
                        onChange={(e) => handleFilter(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          />
        </div>
      </Card>
      {selectedRow && showModal && <AppointmentCard shows={showModal} entity={selectedRow} onClose={handleClose} />}
    </>
  );
};

export default UsersList;
