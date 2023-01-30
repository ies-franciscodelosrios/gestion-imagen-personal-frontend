// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, Users } from 'react-feather'

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
    id: 'invoiceList',
    title: 'Clientes',
    icon: <Users size={12} />,
    navLink: '/apps/invoice/list'
  },
  {
    id: 'list',
    title: 'Profesores',
    icon: <Users size={12} />,
    navLink: '/apps/profesor/list'
  },
  {
    id: 'list',
    title: 'Alumnos',
    icon: <Users size={12} />,
    navLink: '/apps/user/list'
  },
]
