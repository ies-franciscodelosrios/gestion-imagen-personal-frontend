// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import { read, utils } from 'xlsx'
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import { DownloadCloud } from 'react-feather'

// ** Custom Components
import ExtensionsHeader from '@components/extensions-header'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Table, CardHeader, CardTitle, Input, Label, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss'

const Import = (props) => {

  // ** States
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [tableData, setTableData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const getTableData = (arr, name) => {
    setTableData(arr)
    setName(name)
  }

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: result => {
      const reader = new FileReader()
      reader.onload = function () {
        const fileData = reader.result
        const wb = read(fileData, { type: 'binary' })

        wb.SheetNames.forEach(function (sheetName) {
          const rowObj = utils.sheet_to_row_object_array(wb.Sheets[sheetName])
          getTableData(rowObj, result[0].name)
        })
      }
      if (result.length && result[0].name.endsWith('xlsx')) {
        reader.readAsBinaryString(result[0])
      } else {
        toast.error(
          () => (
            <p className='mb-0'>
              You can only upload <span className='fw-bolder'>.xlsx</span>, <span className='fw-bolder'>.xls</span> &{' '}
              <span className='fw-bolder'>.csv</span> Files!.
            </p>
          ),
          {
            style: {
              minWidth: '380px'
            }
          }
        )
      }
    }
  })

  const handleFilter = e => {
    const data = tableData
    let filteredData = []
    const value = e.target.value
    setValue(value)

    if (value.length) {
      filteredData = data.filter(col => {
        const keys = Object.keys(col)

        const startsWithCondition = keys.filter(key => {
          return col[key].toString().toLowerCase().startsWith(value.toLowerCase())
        })

        const includesCondition = keys.filter(key => col[key].toString().toLowerCase().includes(value.toLowerCase()))

        if (startsWithCondition.length) return col[startsWithCondition]
        else if (!startsWithCondition && includesCondition.length) return col[includesCondition]
        else return null
      })
      setFilteredData(filteredData)
      setValue(value)
    } else {
      return null
    }
  }
  /*eslint-disable */
  const headArr = tableData.length
    ? tableData.map((col, index) => {
        if (index === 0) return [...Object.keys(col)]
        else return null
      })
      : []
      /*eslint-enable */
      const dataArr = value.length ? filteredData : tableData.length && !value.length ? tableData : null
      const dataArrApi = []

  
  function setShow() {
    props.handleImportData(dataArrApi);
  }

  const renderTableBody = () => {
    switch (props.type) {
      case 'client':
        Object.assign(dataArrApi,
          dataArr.map((user) => {
            return {
            dni: user["DNI/Pasaporte"],
            name: user["Alumno/a"].split(',')[1],
            surname: user["Alumno/a"].split(',')[0],
            email: user["Correo electrónico personal alumno/a"],
            phone: user["Teléfono personal alumno/a"],
            birth_date: '2000-01-01',
            more_info: ' ',
            life_style: ' ',
            background_health: ' ',
            background_aesthetic: ' ',
            asthetic_routine: ' ',
            hairdressing_routine: ' '
          };
        }));  
        break;

      case 'student':
      
      break;

      case 'teacher':
      
      break;
    
      default:
        break;
    }  

    if (dataArr !== null && dataArr.length) {
      return dataArr.map((col, index) => {
          const keys = Object.keys(col)
          const renderTd = keys.map((key, index) => <td key={index}>{col[key]}</td>)
          return <tr key={index}>{renderTd}</tr>
        }
      )
    } else {
      return null
    }
  }

  const renderTableHead = () => {
    if (headArr.length) {
      return headArr[0].map((head, index) => {
        return <th key={index}>{head}</th>
      })
    } else {
      return null
    }
  }

  return (
    <Fragment>
      <Row className='import-component'>
        <Col sm='12'>
          <Card>
            <CardBody>
              <Row>
                <Col sm='12'>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                      <DownloadCloud size={64} />
                      <h5>Arrastra los archivos aqui o súbelos</h5>
                      <p className='text-secondary'>
                        Añade los archivos o haz click{' '}
                        <a href='/' onClick={e => e.preventDefault()}>
                          explorador
                        </a>{' '}
                        a traves de tu ordenador
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        {tableData.length ? (
          <Col sm='12'>
            <Card>
              <CardHeader className='justify-content-between flex-wrap'>
                <CardTitle tag='h4'>{name}</CardTitle>
                <div className='my-1'>
                  <Button color="primary" onClick={setShow}>
                    Importar
                  </Button>
                </div>
                <div className='d-flex align-items-center justify-content-end'>
                  <Label for='search-input' className='me-1'>
                    Buscar
                  </Label>
                  <Input id='search-input' type='text' bsSize='sm' value={value} onChange={e => handleFilter(e)} />
                </div>
              </CardHeader>
              <Table className='table-hover-animation' responsive>
                <thead>
                  <tr>{renderTableHead()}</tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </Table>
            </Card>
          </Col>
        ) : null}
      </Row>
    </Fragment>
  )
}

export default Import