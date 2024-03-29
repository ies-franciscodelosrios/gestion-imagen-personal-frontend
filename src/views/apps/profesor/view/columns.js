// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Clipboard,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle,
  BookOpen,
  ChevronsRight
} from 'react-feather'

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}

// ** Table columns
export const columns = [
  {
    minWidth: '30px',
    name: 'ID',
    sortable: true,
    sortField: 'id',
    selector: row => row.id,
    cell: row => row.id
  }, {
    minWidth: '200px',
    name: 'Fecha',
    sortable: true,
    sortField: 'date',
    selector: row => row.date,
    cell: row => row.date
  }, {
    minWidth: '200px',
    name: 'Dni cliente',
    sortable: true,
    sortField: 'dni_client',
    selector: row => row.dni_client,
    cell: row => row.dni_client
  }, {
    minWidth: '200px',
    name: 'Dni estudiante',
    sortable: true,
    sortField: 'dni_Student',
    selector: row => row.dni_student,
    cell: row => row.dni_student
  },
  {
    minWidth: '200px',
    name: 'Tratamiento',
    sortable: true,
    sortField: 'treatment',
    selector: row => row.treatment,
    cell: row => row.treatment
  },{
    name: "Protocolo",
    minWidth: '200px',
    sortable: true,
    sortField: 'protocol',
    selector: row => row.protocol,
    cell: row => {
      const color = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].color : 'primary',
        Icon = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].icon : Edit
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
          <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
            <br />
            {row.Protocol}
          </UncontrolledTooltip>
        </Fragment>
      )
    }
  },{
    name: "Consultas",
    minWidth: '200px',
    sortable: true,
    sortField: 'consultancy',
    selector: row => row.consultancy,
    cell: row => {
      const color = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].color : 'primary',
        Icon = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].icon : Clipboard
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
          <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
            <br />
            {row.Consultancy}
          </UncontrolledTooltip>
        </Fragment>
      )
    }
  },{
    name: "Seguimiento",
    minWidth: '200px',
    sortable: true,
    sortField: 'tracking',
    selector: row => row.tracking,
    cell: row => {
      const color = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].color : 'primary',
        Icon = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].icon : ChevronsRight
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
          <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
            <br />
            {row.Tracking}
          </UncontrolledTooltip>
        </Fragment>
      )
    }
  },{
    name: "Encuesta",
    minWidth: '200px',
    sortable: true,
    sortField: 'survey',
    selector: row => row.survey,
    cell: row => {
      const color = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].color : 'primary',
        Icon = invoiceStatusObj[row.invoiceStatus] ? invoiceStatusObj[row.invoiceStatus].icon : BookOpen
      return (
        <Fragment>
          <Avatar color={color} icon={<Icon size={14} />} id={`av-tooltip-${row.id}`} />
          <UncontrolledTooltip placement='top' target={`av-tooltip-${row.id}`}>
            <br />
            {row.Survey}
          </UncontrolledTooltip>
        </Fragment>
      )
    }
  }
]
