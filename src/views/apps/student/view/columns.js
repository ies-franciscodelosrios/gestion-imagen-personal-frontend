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
import { getLabelFromAppointmentTreatment } from '../../../../utility/Utils'
import moment from 'moment'

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
    minWidth: '200px',
    name: 'Fecha',
    sortable: true,
    sortField: 'date',
    selector: row => row.date,
    cell: row => moment(row.date).format('DD/MM/YYYY HH:mm')
  }, {
    minWidth: '200px',
    name: 'Cliente',
    sortable: true,
    sortField: 'client_name',
    selector: row => row.id_client,
    cell: row => `${row.client.name} ${row.client.surname}`
  },
  {
    minWidth: '200px',
    name: 'Tratamiento',
    sortable: true,
    sortField: 'treatment',
    selector: row => row.treatment,
    cell: row => getLabelFromAppointmentTreatment(row.treatment)
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
    sortField: 'Consultancy',
    selector: row => row.Consultancy,
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
    sortField: 'Tracking',
    selector: row => row.Tracking,
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
    sortField: 'Survey',
    selector: row => row.Survey,
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
