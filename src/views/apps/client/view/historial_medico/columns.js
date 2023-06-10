import { getLabelFromAppointmentTreatment } from "../../../../../utility/Utils";

// ** Table columns
export const columns = [
  {
    minWidth: '200px',
    name: 'Cita',
    sortable: true,
    sortField: 'protocol',
    selector: row => row.protocol,
    cell: row =>  (
      <>
      <button
        onClick={() => setSelectedRow(row)}>
        {row.protocol}
      </button>
      </>
    )
  },
  {
    minWidth: '200px',
    name: 'Cliente',
    sortable: true,
    sortField: 'dni_client',
    selector: row => (row?.client?.name || 'vacio') + ' ' + (row?.client?.name || ''),
    cell: row => (row?.client?.name || 'vacio') + ' ' + (row?.client?.name || '')
  }, 
  {
    minWidth: '200px',
    name: 'Estudiante',
    sortable: true,
    sortField: 'dni_Student',
    selector: row => (row?.student?.name || 'vacio') + ' ' + (row?.student?.name || ''),
    cell: row => (row?.student?.name || 'vacio') + ' ' + (row?.student?.name || '')
  },
  {
    minWidth: '120px',
    name: 'Fecha',
    sortable: true,
    sortField: 'date',
    selector: row => (row?.date || 'Sin Fecha'),
    cell: row => (row?.date || 'Sin Fecha')
  },
  {
    minWidth: '200px',
    name: 'Tratamiento',
    sortable: true,
    sortField: 'treatment',
    selector: row => row?.treatment,
    cell: row => getLabelFromAppointmentTreatment(row.treatment)
  }
]
