// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, FileText, MoreVertical, Trash2 } from 'react-feather'


// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import Import from '../../../extensions/import-export/Import'
import { AddProfesor, ApiDelUser, getUsersPaged } from '../../../../services/api'


// Toast styles
import { toast } from 'react-hot-toast';
import '@styles/react/libs/react-select/_react-select.scss';
import { Link } from 'react-router-dom'
import { handleConfirmCancel } from '../../../../utility/Utils'

// ** Table Header
const CustomHeader = ({ teacherList, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, reload }) => {

  // **State Modal Import Clients
  const [show, setShow] = useState(false);

  async function showImport(data) {
    const loading = toast.loading('Cargando Datos');
    try {
      await data.map(async (user) => {
        await AddProfesor(user);

      })
    } catch (error) {
      toast.error('Error al Importar', {
        id: loading,
      });
    } finally {
      reload(true);
      toast.success('Correctamente Importados', {
        id: loading,
      });
      loading.endsWith('Completado')
      setShow(false);
    }
  }

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(teacherList[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
      <Col xl='6' className='d-flex align-items-center p-0'>
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
              <option value='10'>5</option>
              <option value='25'>10</option>
              <option value='50'>25</option>
            </Input>
            <label htmlFor='rows-per-page'>Registros</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
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

          <div className='d-flex align-items-center table-header-actions'>
            <UncontrolledDropdown className='me-1'>
              <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>Exp/Imp</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100' onClick={() => setShow(!show)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>Importar</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(teacherList)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>Exportar</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              Añadir Nuevo Profesor
            </Button>
          </div>
        </Col>
      </Row>
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
            <h1 className="mb-1">Importar Profesores</h1>
          </div>
          <Import type={'teacher'} handleImportData={showImport}></Import>
        </ModalBody>
      </Modal>
    </div>
  )
}

const ProfesorList = () => {
  // ** Store Vars
  const [typingTimeout, setTypingTimeout] = useState(null);

  // ** States
  const [sort, setSort] = useState('desc')
  const [sortColumn, setSortColumn] = useState('id')
  const [searchTerm, setSearchTerm] = useState('')
  const [pagesNumber, setpagesNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [teacherList, setTeacherList] = useState([])

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    fetchTeachers();
  }, [sort, sortColumn, currentPage, rowsPerPage, searchTerm])

  // ** Get data on mount
  const fetchTeachers = async () => {
    try {
      await getUsersPaged({
        "sort": sort,
        "sortcolumn": sortColumn,
        "page": currentPage,
        "perpage": rowsPerPage,
        "searchtext": searchTerm,
        "rol": 1
      }).then((e) => {
        setpagesNumber(e.data.data.last_page);
        setTeacherList(e.data.data.data);
      }).catch(e => {
        toast.error('Error al traer datos');
      });
    } catch (error) {
      console.error('Error al obtener los datos:', error);
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

  const modifiedColumns = [...columns];
  modifiedColumns[4] = {
    ...modifiedColumns[4],
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/profesor/view/${row.id}`}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Detalles</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              className='w-100'
              onClick={async e => {
                (await handleConfirmCancel())? await ApiDelUser(row.id) :'';
                fetchTeachers();
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Eliminar</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>

    )
  };

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
    if (teacherList !== undefined && teacherList.length > 0) {
      return teacherList
    } else {
      return teacherList.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
  }

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
            noDataComponent={'No se encontraron datos a mostar'}
            paginationServer
            columns={modifiedColumns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                teacherList={teacherList}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                reload={fetchTeachers}
              />
            }
          />
        </div>
      </Card>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} reload={fetchTeachers} />
    </Fragment>
  )
}

export default ProfesorList
