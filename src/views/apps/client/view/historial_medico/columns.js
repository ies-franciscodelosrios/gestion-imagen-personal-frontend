// Importa la función necesaria desde "../../../../../utility/Utils"
import { getLabelFromAppointmentTreatment } from "../../../../../utility/Utils";

// Define las columnas
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
  // Elimina la columna "Cliente"
  // {
  //   minWidth: '200px',
  //   name: 'Cliente',
  //   sortable: true,
  //   sortField: 'dni_client',
  //   selector: row => row.client.name + ' ' + row.client.surname,
  //   cell: row => row.client.name + ' ' + row.client.surname
  // }, 
  {
    minWidth: '200px',
    name: 'Estudiante',
    sortable: true,
    sortField: 'dni_Student',
    selector: row => row.student ? row.student.name + ' ' + row.student.surname : '',
    cell: row => row.student ? row.student.name + ' ' + row.student.surname : ''
  },
  {
    minWidth: '120px',
    name: 'Fecha',
    sortable: true,
    sortField: 'date',
    selector: row => row.date,
    cell: row => row.date
  },
  {
    minWidth: '200px',
    name: 'Tratamiento',
    sortable: true,
    sortField: 'treatment',
    selector: row => row.treatment,
    cell: row => getLabelFromAppointmentTreatment(row.treatment)
  }
];
