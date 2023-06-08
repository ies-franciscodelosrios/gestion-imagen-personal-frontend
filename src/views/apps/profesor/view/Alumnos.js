
// ** React Imports
import { Fragment, useState, useEffect } from 'react'



// ** Table Columns
import { columns } from './columnsStudents'

// ** Store & Actions
import{getAllStudentsFromCycle} from '../../../../services/api'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

const Cycle = 'Grado Medio - Estética y belleza'

const CustomHeader = ({ store, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(store.students[0])
    
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
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>Alumnos por pagina</label>
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
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>
        </Col>

      </Row>
    </div>
  )
}


const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.profesor)  

  // ** States
  const [students,setStudents]=useState([])
  const [sort, setSort] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const QUOTE_REQUESTED = "QUOTE_REQUESTED";
  


  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllStudentsFromCycle({
        cycle: store.selectedProfesor.cycle
      }).then(e =>{ setStudents(e.data.data)});
      
    };

    fetchData();

    }, [store.selectedProfesor.cycle]);


  // ** User filter options


  // ** Function in get data on page change
  const handlePagination = page => {
    setStudents(  getAllStudentsFromCycle({
        cycle:store.selectedProfesor.cycle
      }))
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
      setStudents(getAllStudentsFromCycle({
        cycle:store.selectedProfesor.cycle
      }))
    setRowsPerPage(value)
  }


  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
      setStudents(getAllStudentsFromCycle({
        cycle:store.selectedProfesor.cycle
      }))
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.students.length / rowsPerPage))
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
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
    const filters = {
      status: currentStatus.value,
      q: searchTerm
    }


    //setStudents()

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })
    
    if (store.students !== undefined && store.students.length > 0) {
      return store.students
    } else if (store.students === undefined || store.students === 0 && isFiltered) {
      return []
    } else {
      return store.students.slice(0, rowsPerPage)
    }
  }
  

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    setStudents(getAllStudentsFromCycle({
      cycle:store.selectedProfesor.cycle
      })
    )
  }

  return (
    <Fragment>
      {

}

      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={students}
            subHeaderComponent={
              <CustomHeader
                store={students}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>


    </Fragment>
  )
}

export default UsersList


