// ** Icons Import
import { FileText, Circle, Square, UserCheck } from 'react-feather'

export default [
  {
    header: 'Preguntas & Documentación'
  },
  {
    id: 'faq',
    title: 'FAQ',
    icon: <Circle size={12} />,
    permissions: ['admin', 'editor'],
    navLink: '/apps/faq'

  }

]