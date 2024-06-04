import React from 'react';
import { getLabelFromAppointmentTreatment } from "../../../../../utility/Utils";
import { Trash2 } from 'react-feather';  
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
};

export const columns = (setSelectedRow, setShowModal, handleDelete) => [
  {
    minWidth: '200px',
    name: 'Fecha y Hora',
    sortable: true,
    sortField: 'date',
    selector: row => row.date,
    cell: row => formatDate(row.date),
    sortFunction: (a, b) => new Date(b.date) - new Date(a.date) 
  },
  {
    minWidth: '200px',
    name: 'Cita',
    sortable: true,
    sortField: 'protocol',
    selector: row => row.protocol,
    cell: row => (
      <>
        <Link
          to="#"
          className='user_name text-truncate text-body'
          onClick={(e) => { 
            e.preventDefault();
            setSelectedRow(row); 
            setShowModal(true); 
          }}
        >
          {row.protocol}
        </Link>
      </>
    )
  },
  {
    minWidth: '200px',
    name: 'Tratamiento',
    sortable: true,
    sortField: 'treatment',
    selector: row => row.treatment,
    cell: row => getLabelFromAppointmentTreatment(row.treatment)
  },
  {
    minWidth: '150px', 
    name: 'Acciones',
    cell: row => (
      <div className='column-action'>
        <Trash2 
          size={14} 
          className='cursor-pointer' 
          style={{ marginLeft: '30px' }} 
          onClick={() => handleDelete(row.id)} 
        />
      </div>
    )
  }
];

