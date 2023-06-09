
// ** React Imports
import { Fragment, useState, useEffect } from 'react'


// ** Table Columns

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit } from 'react-feather'

// Toast styles
import { toast } from 'react-hot-toast';
import '@styles/react/libs/react-select/_react-select.scss';

import {
  Row,
  Col,
  Card,
  Input,
} from 'reactstrap'
import { getAppointmentPaged } from '../../../../services/api'
import AppointmentCard from '../../client/view/AppointmentCard'
import { columns } from '../../client/view/historial_medico/columns';


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
            />
          </div>
        </Col>

      </Row>
    </div>
  );
}


const UsersList = () => {
  // ** Store Vars
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // ** States
  const [sort, setSort] = useState('asc');
  const [sortColumn, setSortColumn] = useState('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagesNumber, setpagesNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, [rowsPerPage, currentPage, searchTerm]);

    // ** Get data on mount
    const fetchAppointments = async () => {
      try {
        await getAppointmentPaged({
          "page": currentPage,
          "perpage": rowsPerPage,
          "searchtext": searchTerm,
          "dni_student": "",
          "dni_client": ""
        }).then((e) => {
          setpagesNumber(e.data.last_page);
          setAppointments(e.data.data);
        }).catch(e => {
          toast.error('Error al traer datos');
        });
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      }
    };

  // ** Function in get data on page change
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }


  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(() => {
      setSearchTerm(val);
    }, 1000));
  }

  // ** Custom Pagination
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
    )
  }

    // ** Table data to render
  const dataToRender = () => {
    if (appointments !== undefined && appointments.length > 0) {
      return appointments
    } else {
      return appointments.slice(0, rowsPerPage)
    }
  }


  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  }

  const modifiedColumns = [...columns];
  modifiedColumns[0] = {
    ...modifiedColumns[0],
    cell: row => (
      <div type='button' onClick={() => { setSelectedRow(row); setShowModal(true); }}>
        {row.protocol} &nbsp; <Edit size={14} className='me-50' />
      </div>

    )
  };

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
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
      {selectedRow && showModal ? <AppointmentCard shows={showModal} entity={selectedRow} onClose={handleClose}></AppointmentCard> : <></>}
    </Fragment>
  )
}

export default UsersList
