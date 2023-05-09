// ** Icons Import
import { Calendar, Users } from 'react-feather'

export default [
  {
    header: 'Aplicación'
  },

  {
    id: 'calendar',
    title: 'Calendario',
    icon: <Calendar size={20} />,
    navLink: '/apps/calendar'
  },
  {
    id: 'clientList',
    title: 'Clientes',
    icon: <Users size={12} />,
    navLink: '/apps/client/list'
  }
]
